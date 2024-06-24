"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Sheet,
  Textarea,
  Grid,
  Typography,
} from "@mui/joy";
import TextEditor from "../TextEditor/TextEditor";
import { useEditorContext } from "../../_contexts/Editor.context";
import parseContentToStanzas from "../../_utils/parseContentToStanzas";
import { useUser } from "@/app/_contexts/User.context";

const PoemForm = () => {
  const { content } = useEditorContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Original");
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const handleSave = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const parsedContent = parseContentToStanzas(content);

    const poem = {
      title,
      author,
      tags: tags.split(",").map((tag) => tag.trim()), // Assuming tags are comma-separated
      stanzas: parsedContent,
      status: "draft", // Assuming default status is draft
      userId: user?.id,
      username: user?.name,
      comment,
    };

    console.log("Saving poem:", poem);

    try {
      const response = await fetch("/api/mongodb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poem),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Poem saved successfully:", result.data);

      // Redirect to the poem's page
      if (result.data.id) {
        router.push(`/poem/${result.data.id}`);
      }
    } catch (error) {
      console.error("Error saving poem:", error);
    }
  };

  return (
    <Sheet sx={{ width: "100%", maxWidth: "1200px", p: 3 }}>
      <Box component="form" onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <FormControl required>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Author"
                value={author}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthor(e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input
                placeholder="Comma separated"
                value={tags}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTags(e.target.value)
                }
              />
            </FormControl>
            <TextEditor />
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                Comment about the Poem
              </FormLabel>
              <Typography level="title-sm" sx={{ marginBottom: "0.5rem" }}>
                What did this make you think/feel? What memory do you associate
                with this?
              </Typography>
              <Textarea
                placeholder="Share your thoughts or feelings about this poem..."
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
                minRows={10}
                sx={{ width: "100%" }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <Button type="submit" variant="solid">
            Save
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default PoemForm;
