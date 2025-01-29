import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { MoreVert as MoreVerticalIcon } from "@mui/icons-material";
import XLogo from "./../Logo/x.png";
import TumblrLogo from "../Logo/tumblr.png";
import BlueskyLogo from "../Logo/bluesky.png";
import { useAuthContext } from "../context/AuthContext";

const ScrollArea = styled(Box)({
  overflow: "auto",
  flex: 1,
});

// Platform logos mapping
const platformLogos = [XLogo, TumblrLogo, BlueskyLogo];

const getStatusColor = (status) => {
  switch (status) {
    case "scheduled":
      return { bgcolor: "primary.light", borderColor: "primary.main" };
    case "published":
      return { bgcolor: "success.light", borderColor: "success.main" };
    case "draft":
      return { bgcolor: "grey.300", borderColor: "grey.600" };
    default:
      return { bgcolor: "grey.100", borderColor: "grey.400" };
  }
};

export const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const { authToken } = useAuthContext();
  console.log(authToken);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/get-posts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await res.json();
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <ScrollArea>
        <Box sx={{ p: 2 }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{
                  "& th": { color: "text.secondary", fontSize: "0.875rem" },
                }}
              >
                <TableCell>Status</TableCell>
                <TableCell>Content</TableCell>
                {/* <TableCell>Labels</TableCell> */}
                <TableCell>Platforms</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow
                  key={post.id}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <TableCell>
                    <Chip
                      label={post.status}
                      variant="outlined"
                      sx={{
                        textTransform: "capitalize",
                        ...getStatusColor(post.status),
                      }}
                    />
                  </TableCell>
                  <TableCell>{post.caption}</TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      {platformLogos.map((platform) => (
                        <Box
                          key={platform}
                          component="img"
                          src={platform}
                          alt={`${platform} logo`}
                          sx={{
                            width: 24,
                            height: 24,
                            objectFit: "contain",
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <MoreVerticalIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </ScrollArea>
    </Box>
  );
};
