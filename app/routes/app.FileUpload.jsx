import {
  DropZone,
  Card,
  Text,
  Thumbnail,
  InlineStack,
  BlockStack
} from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      console.log('📥 File dropped:', acceptedFiles);
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
    },
    [],
  );

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
    <Card title="Upload PDF File" sectioned>
      <DropZone
        onDrop={handleDropZoneDrop}
        accept="application/pdf"
        type="file"
        allowMultiple={false}
      >
        {uploadedFile ? (
          <div style={{ padding: '1rem' }}>
            {uploadedFile}
          </div>
        ) : (
          <DropZone.FileUpload
            actionTitle="Click or drag a PDF here"
            actionHint="Only .pdf files are supported"
          />
        )}
      </DropZone>
    </Card>
  );
}
