import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editNote, setEditNote] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const openEditModal = (note) => {
    setEditNote(note);
    onOpen();
  };

  const updateNote = () => {
    setNotes(
      notes.map((note) =>
        note.id === editNote.id ? { ...note, text: editNote.text } : note
      )
    );
    onClose();
  };

  return (
    <Box maxWidth="800px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Basic Notes App
      </Heading>
      <Flex mb={4}>
        <Input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a new note"
          mr={2}
        />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote}>
          Add Note
        </Button>
      </Flex>
      <Stack spacing={4}>
        {notes.map((note) => (
          <Flex
            key={note.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            alignItems="center"
          >
            <Text flex={1}>{note.text}</Text>
            <IconButton
              icon={<FaEdit />}
              aria-label="Edit note"
              onClick={() => openEditModal(note)}
              mr={2}
            />
            <IconButton
              icon={<FaTrash />}
              aria-label="Delete note"
              onClick={() => deleteNote(note.id)}
            />
          </Flex>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={editNote?.text || ""}
              onChange={(e) =>
                setEditNote({ ...editNote, text: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateNote}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;