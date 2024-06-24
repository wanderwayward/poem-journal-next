"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Input, FormControl, FormLabel, Sheet } from "@mui/joy";
import TextEditor from "../TextEditor/TextEditor";
import { useEditorContext } from "../../_contexts/Editor.context";
import parseContentToStanzas from "../../_utils/parseContentToStanzas";

const PoemForm = () => {
  const { content } = useEditorContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Original");
  const [tags, setTags] = useState("");

  const handleSave = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const parsedContent = parseContentToStanzas(content);

    const poem = {
      title,
      author,
      tags: tags.split(",").map((tag) => tag.trim()), // Assuming tags are comma-separated
      stanzas: parsedContent,
      status: "draft", // Assuming default status is draft
      userId: "USER_ID", // Replace with actual user ID
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
    <Sheet sx={{ display: "flex", flexDirection: "column", width: "800px" }}>
      <Box component="form" onSubmit={handleSave}>
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
        <Button type="submit" variant="solid">
          Save
        </Button>
      </Box>
    </Sheet>
  );
};

export default PoemForm;
