"use client";
import { useState, ChangeEvent, FormEvent, SyntheticEvent } from "react";
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
  Select,
  Option,
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
  const [status, setStatus] = useState("Draft");
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const handleSave = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const parsedContent = parseContentToStanzas(content);

    const poem = {
      title: title.trim() || "Untitled",
      author: author.trim() || "Original",
      tags: tags.split(",").map((tag) => tag.trim()),
      stanzas: parsedContent,
      status,
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
                variant="soft"
                placeholder="Untitled"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </FormControl>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Author</FormLabel>
                <Input
                  variant="soft"
                  placeholder="Author"
                  value={author}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAuthor(e.target.value)
                  }
                />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Status</FormLabel>
                <Select
                  variant="soft"
                  placeholder="Draft"
                  value={status}
                  onChange={(
                    event: SyntheticEvent | null,
                    value: string | null
                  ) => setStatus(value as string)}
                >
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                </Select>
              </FormControl>
            </Box>

            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input
                variant="soft"
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
                variant="soft"
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
          <Button type="submit" variant="soft">
            Save
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default PoemForm;
