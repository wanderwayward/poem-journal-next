"use client";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
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
  Chip,
  ChipDelete,
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
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const handleSave = async (event: FormEvent, publish: boolean) => {
    event.preventDefault(); // Prevent default form submission

    const parsedContent = parseContentToStanzas(content);

    const poem = {
      title: title.trim() || "Untitled",
      author: author.trim() || "Original",
      tags: tags.filter((tag) => tag.trim() !== ""),
      stanzas: parsedContent,
      status: publish ? "Published" : "Draft",
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

      // Redirect based on status
      if (result.data.id) {
        const redirectUrl = publish
          ? `/poem/${result.data.id}`
          : "/user?showDrafts=true";
        router.push(redirectUrl);
      }
    } catch (error) {
      console.error("Error saving poem:", error);
    }
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && currentTag.trim() !== "") {
      e.preventDefault();
      if (currentTag.trim() !== "") {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Sheet
      variant="soft"
      color="primary"
      sx={{ width: "100%", maxWidth: "1200px", p: 3 }}
    >
      <Box component="form">
        <Grid container spacing={2}>
          <Grid xs={12} md={6} sx={{ maxHeight: "600px", overflowY: "auto" }}>
            <FormControl>
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
            </Box>

            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    endDecorator={
                      <ChipDelete onDelete={() => handleTagRemove(tag)} />
                    }
                  >
                    {tag}
                  </Chip>
                ))}
              </Box>
              <Input
                variant="soft"
                placeholder="Comma separated"
                value={currentTag}
                onChange={handleTagChange}
                onKeyDown={handleTagKeyDown}
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
          <Button
            onClick={(e) => handleSave(e, false)}
            variant="soft"
            color="danger"
            size="lg"
          >
            Save Draft
          </Button>
          <Button
            onClick={(e) => handleSave(e, true)}
            variant="soft"
            color="success"
            size="lg"
            sx={{ ml: 2 }}
          >
            Publish
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default PoemForm;
