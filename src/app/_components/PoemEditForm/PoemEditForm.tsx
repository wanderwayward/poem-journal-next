"use client";
import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
} from "react";
import { useParams, useRouter } from "next/navigation";
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
  CircularProgress,
} from "@mui/joy";
import TextEditor from "../TextEditor/TextEditor";
import { useEditorContext } from "../../_contexts/Editor.context";
import parseContentToStanzas from "../../_utils/parseContentToStanzas";
import parseStanzasToContent from "../../_utils/parseStanzasToContent";
import { useUser } from "@/app/_contexts/User.context";
import { PoemType } from "@/app/_types/Types";

const PoemEditForm = () => {
  const { content, setContent } = useEditorContext();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [poemData, setPoemData] = useState<PoemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Original");
  const [tags, setTags] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      fetchPoem();
    }
  }, [id]);

  const fetchPoem = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/poems/${id}`);
      const result = await response.json();
      if (result.status === "success") {
        const poem = result.data;
        setPoemData(poem);
        setTitle(poem.title);
        setAuthor(poem.author);
        setTags(poem.tags.join(", "));
        setComment(poem.comment);

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
  };

  const handleSave = async (event: FormEvent, publish: boolean) => {
    event.preventDefault(); // Prevent default form submission

    const parsedContent = parseContentToStanzas(content);

    const poem = {
      title: title.trim() || "Untitled",
      author: author.trim() || "Original",
      tags: tags.split(",").map((tag) => tag.trim()),
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
        <Typography color="danger">{error}</Typography>
      </Box>
    );
  }

  return poemData ? (
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
  ) : (
    <Box sx={{ padding: "20px" }}>
      <Typography>No poem found</Typography>
    </Box>
  );
};

export default PoemEditForm;
