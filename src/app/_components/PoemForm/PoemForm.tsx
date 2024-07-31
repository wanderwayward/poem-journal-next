"use client";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Paper,
  TextareaAutosize,
  Grid,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { SoftTextField } from "../CustomComponents/CustomComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "../TextEditor/TextEditor";
import { useEditorContext } from "../../_contexts/Editor.context";
import parseContentToStanzas from "../../_utils/parseContentToStanzas";
import { useUser } from "@/app/_contexts/User.context";
import { useUserPoems } from "@/app/_contexts/UserPoems.context";

const PoemForm = () => {
  const { content } = useEditorContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Original");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const { updatePoems } = useUserPoems();

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

      // Update user poems
      updatePoems();

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
    <Paper sx={{ width: "100%", p: 2 }}>
      <Box component="form">
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ minHeight: "500px", maxHeight: "600px", overflowY: "hidden" }}
          >
            <FormControl fullWidth>
              <FormLabel>Title</FormLabel>
              <SoftTextField
                style={{ marginBottom: ".6em" }}
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
              <FormControl fullWidth>
                <FormLabel>Author</FormLabel>
                <SoftTextField
                  style={{ marginBottom: ".6em" }}
                  placeholder="Author"
                  value={author}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAuthor(e.target.value)
                  }
                />
              </FormControl>
            </Box>

            <TextEditor />
          </Grid>

          {/* second column */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "1rem",
            }}
          >
            <FormControl fullWidth>
              <FormLabel sx={{ mb: "0.1em" }}>Tags</FormLabel>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                {tags.map((tag, index) => (
                  <Chip
                    color="error"
                    key={index}
                    label={tag}
                    onDelete={() => handleTagRemove(tag)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
              <SoftTextField
                style={{ marginBottom: ".6em" }}
                placeholder="Comma separated"
                value={currentTag}
                onChange={handleTagChange}
                onKeyDown={handleTagKeyDown}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel
                sx={{ fontSize: "1.25rem", fontWeight: "bold", mb: 1 }}
              >
                Comment about the Poem
              </FormLabel>
              <Typography variant="subtitle1" sx={{ marginBottom: "1rem" }}>
                What did this make you think/feel? What memory do you associate
                with this?
              </Typography>
              <SoftTextField
                placeholder="Share your thoughts or feelings about this poem..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                minRows={9}
                fullWidth
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
            variant="contained"
            color="primary"
            size="large"
          >
            Save Draft
          </Button>
          <Button
            onClick={(e) => handleSave(e, true)}
            variant="contained"
            color="primary"
            size="large"
            sx={{ ml: 2 }}
          >
            Publish
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PoemForm;
