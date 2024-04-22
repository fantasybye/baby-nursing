"use client"
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Image } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
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
    } else if(typeof value === 'string' && value !== '') {
      setFileList(
        [{
          uid: Math.random().toString(),
          name: 'image.png',
          status: 'done',
          url: value,
        }]
      )
    }
  }, [value])

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newFile = newFileList[newFileList.length - 1];
    if(newFile?.originFileObj)
      getBase64(newFile?.originFileObj).then((img) => {
        uploadImg(img).then((res) => {
          const newList:UploadFile[] = [...fileList,  {
            uid: newFile.uid,
            name: newFile.name,
            status: 'done',
            url: res.data.data,
          }]
          if(onChange) {
            onChange(newList.filter((f) => !!f.url).filter((s) => s.status === 'done').map((item) => item.url!))
          }
          setFileList(newList);
        })
      })
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
        listType="picture-card"
        fileList={fileList}
        onRemove={(file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
        beforeUpload={() => {
          return false;
        }}
        withCredentials
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= max ? null : uploadButton}
      </Upload>
     {previewImage &&
        <Image
          wrapperStyle={{ display: 'none' }}
          alt="preview"
          style={{ width: '100%' }} 
          src={previewImage}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
        />}
    </>
  );
};
