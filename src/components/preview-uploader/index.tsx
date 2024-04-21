"use client"
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import Image from 'next/image';
import { uploadImg } from '@/api';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface PreviewUploaderProps {
    value?: string[];
    max?: number;
    onChange?: (urls: string[]) => void;
}

export const PreviewUploader: React.FC<PreviewUploaderProps> = ({ value = [], max = 1, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if(value instanceof Array && value.filter((v) => v !== '').length) {
      setFileList(value.map((v, index) => (
        {
          uid: index.toString(),
          name: 'image.png',
          status: 'done',
          url: v,
        }
      )))
    }
  }, [value])

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if(onChange) {
        onChange(newFileList.filter((f) => !!f.url).filter((s) => s.status === 'done').map((item) => item.url!))
    }
    setFileList(newFileList);
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none', cursor: "pointer" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        action={(file) => { return getBase64(file).then((img: string) => uploadImg(img)).then((res) => res.data)}}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= max ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <Image alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
