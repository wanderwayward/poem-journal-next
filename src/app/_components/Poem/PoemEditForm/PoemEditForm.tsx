"use client";
import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Paper,
  Grid,
  Typography,
  CircularProgress,
  Chip,
  Tooltip,
  Switch,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import TextEditor from "../../TextEditor/TextEditor";
import { useEditorContext } from "../../../_contexts/Editor.context";
import parseContentToStanzas from "../../../_utils/parseContentToStanzas";
import parseStanzasToContent from "../../../_utils/parseStanzasToContent";
import { useUser } from "@/app/_contexts/User.context";
import { useUserPoems } from "@/app/_contexts/UserPoems.context";
import { PoemType } from "@/app/_types/Types";
import { SoftTextField } from "../../CustomComponents/CustomComponents";

const PoemEditForm = () => {
  const theme = useTheme();
  const backgroundColor = alpha(theme.palette.warning.main, 0.2);

  const { content, setContent } = useEditorContext();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [poemData, setPoemData] = useState<PoemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const { updatePoems } = useUserPoems();
  const initialAuthor = user?.name || "Original";

  const [areTags, setAreTags] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(initialAuthor);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isOriginal, setIsOriginal] = useState(false);

  const fetchPoem = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/poems/${id}`);
      const result = await response.json();
      if (result.status === "success") {
        const poem = result.data;
        setPoemData(poem);
        setTitle(poem.title);
        setAuthor(poem.author);
        setTags(poem.tags);
        setComment(poem.comment);
        setAreTags(poem.tags.length > 0);
        setIsPublic(poem.public);
        setIsOriginal(poem.type === "original");

        // Convert stanzas to Slate format
        const formattedContent = parseStanzasToContent(poem.stanzas);
        setContent(formattedContent);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to fetch poem");
    } finally {
      setLoading(false);
    }
  }, [id, setContent]);

  useEffect(() => {
    if (id) {
      fetchPoem();
    }
  }, [id, fetchPoem]);

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
      type: isOriginal ? "Original" : "Non-original",
      public: isPublic,
    };

    try {
      const response = await fetch(id ? `/api/poems/${id}` : "/api/mongodb", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poem),
      });

      const result = await response.json();

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
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
      setAreTags(true); // Update areTags to true when a new tag is added
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    if (tags.length === 1 && tagToRemove === tags[0]) {
      setAreTags(false); // Update areTags to false if all tags are removed
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return poemData ? (
    <Paper sx={{ width: "100%", p: 2, bgcolor: backgroundColor }}>
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

            <TextEditor areTags={areTags} />
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
                minRows={7}
                fullWidth
              />
            </FormControl>
            <FormControl
              sx={{ display: "flex", flexDirection: "row", mb: 1, mt: 2 }}
            >
              <FormLabel sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                Make my poem visible to the community.
              </FormLabel>
              <Switch
                checked={isPublic}
                sx={{ ml: "auto", position: "relative", top: -3 }}
                onChange={() => setIsPublic(!isPublic)}
              />
            </FormControl>
            <FormControl
              sx={{ display: "flex", flexDirection: "row", mb: 1, mt: 2 }}
            >
              <FormLabel
                sx={{ fontSize: "1.25rem", fontWeight: "bold", mb: 1 }}
              >
                My poem is an
                <Tooltip
                  title="Original poems are marked with a star on your profile."
                  disableInteractive
                >
                  <Button>original work.</Button>
                </Tooltip>
              </FormLabel>
              <Switch
                checked={isOriginal}
                onChange={() => setIsOriginal(!isOriginal)}
                sx={{ ml: "auto", position: "relative", top: -3 }}
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
  ) : (
    <Box sx={{ padding: "20px" }}>
      <Typography>No poem found</Typography>
    </Box>
  );
};

export default PoemEditForm;
