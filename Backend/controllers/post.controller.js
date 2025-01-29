import { HfInference } from "@huggingface/inference";
import ImageModel from "../models/image.model.js";
import { BskyAgent } from "@atproto/api";
import User from "../models/user.model.js";
import fs from 'fs';
import path from 'path';
import Task from "../models/task.model.js";
import { agenda } from "../agenda.js";  

export const addTask = async (req, res) => {
  const { title, scheduleDate } = req.body;

  // Convert the scheduleDate to a Date object (assumes it is in ISO string format)
  let taskDate = new Date(scheduleDate);

  // Subtract 5 hours and 30 minutes (for IST adjustment)
  taskDate.setHours(taskDate.getHours() - 5);
  taskDate.setMinutes(taskDate.getMinutes() - 30);

  // Create and save the task with the adjusted date
  const newTask = new Task({ title, scheduleDate: taskDate });
  await newTask.save();

  // Schedule the job with Agenda
  await agenda.schedule(taskDate, "execute task", { taskId: newTask._id });

  res.json({ message: "Task scheduled successfully!", task: newTask });
};


export const postHandler = async (req, res) => {
  const { brandsWork, monthlyDescription, occasion, dateAndTime } = req.body;
  const user = req.user;
  console.log("User:", user);

  const postTime = new Date(dateAndTime);

  if (isNaN(postTime)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  const {postCaption} = await captionGenerator(brandsWork, monthlyDescription, occasion, dateAndTime);
  // console.log("Post Caption:", postCaption);
  // console.log("Image Generation Prompt:", imageGenerationPrompt);

  const imageGenerationPrompt = `
  Create a visually stunning, high-quality image for a professional social media post that aligns with the following details:
  **Theme:** ${monthlyDescription}
  **Occasion:** ${occasion}
  **Brand Identity:** ${brandsWork}  
  **Text Overlay:** "Trending Now | ${occasion} | ${brandsWork}"
`;
  const imageBuffer = await generateImage(imageGenerationPrompt);

  const imagePath = await saveImageLocally(imageBuffer);

  console.log("Image Buffer:", imageBuffer);

  const newPost = {
    image: imagePath,
    caption: postCaption,
    postTime: postTime,
  };

  try{
    await User.findByIdAndUpdate(
      user._id,  // Assuming user._id is the logged-in user's ID
      { $push: { posts: newPost } },  // Add new post to the posts array
      { new: true }  // Return the updated document
    );

    res.json({ msg: "Post created successfully!" });
  }
  catch(err){
    console.error("Error saving post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const saveImageLocally = async (imageBuffer) => {
  const uploadDir = path.join(process.cwd(), 'uploads'); // Define the directory where images will be saved
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
  }

  const randomFilename = `image_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`; // Generate a random filename
  const filePath = path.join(uploadDir, randomFilename);

  fs.writeFileSync(filePath, imageBuffer); // Save the image buffer to the file

  return filePath; // Return the file path
};

const captionGenerator = async (
  brandsWork,
  monthlyDescription,
  occasion,
  dateAndTime
) => {
  const textGenerationPrompt = `
        Generate a high-quality, professional, and engaging social media caption for a brand.
        - Brand Focus: ${brandsWork}
        - Monthly Theme: ${monthlyDescription}
        - Occasion: ${occasion}
        - Date & Time: ${dateAndTime}
        - Keep it trendy and relatable to the current scenario. For example, if an event like Maha Kumbh is happening, make it relevant to cultural sentiments.
        - Ensure the caption is concise, impactful, and aligns with top-performing brand posts.
        - Use an engaging tone that connects emotionally with the audience and encourages interaction.
        - Optimize for social media virality, incorporating relevant hashtags and call-to-actions.
        - Also, include hashtags that resonate with the brand's identity and the event's theme. Separate them with a \n.
        - Keep the caption between 150-200 characters for better engagement.


        Example: 
        "As the sacred waters of the Maha Kumbh cleanse the soul, let our journey cleanse the spirit of innovation! ✨ Embracing tradition while shaping the future. #MahaKumbh2025 #TimelessTradition #InnovationMeetsCulture"
  `;

  const postCaption = await GeminiResponse(textGenerationPrompt);

  return { postCaption };
};


const GeminiResponse = async (prompt) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBck8IubK8_gylIL5w5GvRjhd0m6uGu4s0`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  let geminiText = data.candidates[0].content.parts[0].text;
  return geminiText;
}


const generateImage = async (imageGenerationPrompt) => {
  const imgClient = new HfInference("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");

  const imageBlob = await imgClient.textToImage({
    model: "ZB-Tech/Text-to-Image",
    inputs: imageGenerationPrompt,
    // parameters: { num_inference_steps: 5 },
    parameters: {
      num_inference_steps: 100, // Match Hugging Face defaults
      guidance_scale: 15,     // Match Hugging Face defaults
      seed: 42,                // Optional: Set a fixed seed for reproducibility
      negative_prompt: "blurry, low quality, distorted, unrealistic, text, watermark",
      // target_size: {
      //   width: 768, // Adjust resolution
      //   height: 768,
      // },
      scheduler: "DPMSolverMultistep", // Match Hugging Face defaults
    },
    provider: "hf-inference",
  });

  const buffer = await imageBlob.arrayBuffer();
  const imageBuffer = Buffer.from(buffer);
  return imageBuffer;
};

export const submitPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    // Login to Bluesky first
    await login();
    console.log("user logged in SkyBlue");

    const userRecord = await User.findById(user._id).select("posts");
    const post = userRecord.posts.find(post => post._id.toString() === postId);

    if (!post) {
      console.log("Post not found for ID:", postId);
      return res.status(404).json({ error: "Post not found" });
    }


    const { caption, image, postTime } = post;
    
    const imageBuffer = fs.readFileSync(image);




    console.log("Uploading image to Bluesky...");
    const uploadResponse = await uploadImage(imageBuffer);
    console.log("Image uploaded to Bluesky", uploadResponse);

    const blobRef = {
      $type: "blob",
      ref: uploadResponse.blob.ref,
      mimeType: uploadResponse.blob.mimeType,
      size: uploadResponse.blob.size
    };

    await agent.post({
      text: caption,
      embed: {
        $type: "app.bsky.embed.images",
        images: [{
          alt: "Posted image",
          image: blobRef
        }]
      }
    });

    res.json({ msg: "Post created successfully!" });
  } catch (error) {
    console.error("Error in submitPost:", error);
    res.status(500).json({ 
      error: "Failed to submit post", 
      details: error.message 
    });
  }
};

const agent = new BskyAgent({
  service: "https://bsky.social",
});


const login = async () => {
  await agent.login({
    identifier: "binaryfetch786.bsky.social",
    password: "Binaryfetch@2k24",
  });
};

// Function to upload image to Bluesky
const uploadImage = async (imageBuffer) => {
  const response = await agent.uploadBlob(imageBuffer, {
    encoding: "image/jpeg", // Ensure correct MIME type
  });
  return response.data;
};


export const getPost=async(req, res)=>{
  const user = req.user;
  console.log('User:',user);
  const userRecord = await User.findById(user._id).select("posts");
  const posts = userRecord.posts;
  res.json(posts);
}