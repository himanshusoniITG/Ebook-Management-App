import {
  DropZone,
  Card,
  Text,
  Thumbnail,
  InlineStack,
  BlockStack,
} from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

export default function FileUpload({ onFileChange }) {
  const [file, setFile] = useState(null);
  const [selectfile_outline, setselectfile_outline] = useState(true);

  const handleDropZoneDrop = useCallback((dropFiles, acceptedFiles, rejectedFiles) => {
    console.log("📥 DropZone Triggered");
    console.log("✅ Accepted Files:", acceptedFiles);
    console.log("❌ Rejected Files:", rejectedFiles);

    const selectedFile = acceptedFiles[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setselectfile_outline(false);
      onFileChange(selectedFile);
    } else {
      setFile(null);
      setselectfile_outline(true);
      alert("Only PDF files are allowed.");
    }
  }, [onFileChange]);

  const uploadedFile = file && (
    <InlineStack alignment="center" gap="200">
      <Thumbnail source={NoteIcon} alt={file.name} size="small" />
      <BlockStack>
        <Text>{file.name}</Text>
        <Text variant="bodySm" as="p">
          {(file.size / 1024).toFixed(2)} KB
        </Text>
      </BlockStack>
    </InlineStack>
  );

  return (
    <Card title="Select file details" sectioned>
      <DropZone
        accept="application/pdf"
        allowMultiple={false}
        outline={selectfile_outline}
        type="file"
        label="Select PDF File"
        onDrop={handleDropZoneDrop}
      >
        <div style={{ minHeight: '100px', padding: '1rem' }}>
          {uploadedFile ? (
            <Card>{uploadedFile}</Card>
          ) : (
            <Text variant="bodyMd" as="p" alignment="center">
              Drag and drop a PDF file here or click to upload.
            </Text>
          )}
        </div>
      </DropZone>
    </Card>
  );
}
