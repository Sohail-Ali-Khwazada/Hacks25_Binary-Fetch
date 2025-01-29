import React from "react";
import { Card, CardContent } from "../components/card.jsx";
import { CheckCircle, Clock } from "lucide-react";

const posts = [
  { id: 1, content: "Posted on Twitter", date: "Jan 20, 2024", status: "past" },
  { id: 2, content: "Scheduled for Instagram", date: "Feb 10, 2024", status: "upcoming" },
  { id: 3, content: "Posted on LinkedIn", date: "Jan 25, 2024", status: "past" },
  { id: 4, content: "Scheduled for Facebook", date: "Feb 15, 2024", status: "upcoming" },
];

export const PostingSchedule = () => {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Social Media Timeline</h2>
      <div className="space-y-4 border-l-2 border-gray-300 pl-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className={`relative p-4 border ${
              post.status === "past" ? "border-green-500" : "border-yellow-500"
            }`}
          >
            <span className="absolute -left-3 top-5">
              {post.status === "past" ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <Clock className="text-yellow-500" size={20} />
              )}
            </span>
            <CardContent>
              <p className="text-gray-800 font-semibold">{post.content}</p>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};