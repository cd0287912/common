import React, { useState, useEffect } from 'react';
import { history, useLocation } from 'umi';
import { Drawer, Space, Button, Divider } from 'antd';
import PreviewSimple from './previewSimple';
import BasicModal from './basicModal';
import {
  createPageApi,
  getPageByIdApi,
  updatePageByIdApi,
  getAllPageTypesApi,
  fileUpload,
} from '@/api';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';

import 'braft-extensions/dist/code-highlighter.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import 'prismjs/components/prism-java';
const options = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript',
    },
    {
      name: 'HTML',
      syntax: 'html',
    },
    {
      name: 'CSS',
      syntax: 'css',
    },
    {
      name: 'Java',
      syntax: 'java',
    },
  ],
};
BraftEditor.use(CodeHighlighter(options));

import './create.scss';

import Prism from 'prismjs';
Prism.hooks.add('before-highlight', function(env) {
  env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, '\n');
  env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, '');
});

const excludeControls = [
  'separator',
  'hr',
  'list-ul',
  'list-ol',
  'clear',
  'undo',
  'redo',
  'strike-through',
  'superscript',
  'subscript',
  'remove-styles',
];

export default () => {
  const [preview, setPreview] = useState({
    title: '',
    desc: '',
    mask: [],
    time: +new Date(),
    content: '',
    type: [],
    typeList: [],
    is_top: false,
    is_Publish: true,
    editorState: '',
    showPreview: false,
    showBasic: false,
  });
  Prism.highlightAll();
  const location = useLocation();
  const _id = location.query._id || '';
  useEffect(() => {
    getAllPageTypesApi().then(res => {
      if (res) {
        const options = res.data.map(item => ({
          label: item.title,
          value: item._id,
        }));
        if (_id) {
          getPageByIdApi(_id).then(res => {
            const { type, content, title, desc, is_top, time } = res.data;
            setPreview({
              ...preview,
              time,
              title,
              desc,
              type,
              is_top,
              typeList: options,
              editorState: BraftEditor.createEditorState(content),
            });
          });
        } else {
          setPreview({ ...preview, typeList: options });
        }
      }
    });
  }, []);
  /* 保存预览 */
  const submitContent = () => {
    if (preview.editorState.isEmpty()) {
      return false;
    }
    setPreview({
      ...preview,
      content: preview.editorState.toHTML(),
      showBasic: true,
    });
  };

  const handle2Preview = values => {
    const mask = delMask();
    setPreview({
      ...preview,
      showBasic: false,
      ...values,
      showPreview: true,
      mask,
    });
  };

  const delMask = () => {
    const htmlContent = preview.editorState.toHTML();
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let nameReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let imgHtmlArr = htmlContent.match(imgReg) || [];
    const mask = [];
    for (let i = 0; i < imgHtmlArr.length; i++) {
      let names = imgHtmlArr[i].match(nameReg);
      if (names && names[1]) {
        if (mask.length < 3) {
          mask.push(names[1]);
        }
      }
    }
    return mask;
  };

  /* 发布 */
  const handleSave2Publish = async is_Publish => {
    const { content, desc, is_top, mask, time, title, type } = preview;
    const params = {
      content,
      desc,
      is_top,
      mask,
      time,
      title,
      type,
      is_Publish,
    };
    let result = null;
    if (_id) {
      result = await updatePageByIdApi(_id, params);
    } else {
      result = await createPageApi(params);
    }
    if (result) {
      setTimeout(() => {
        history.push('/admin/page/list');
      }, 1000);
    }
  };

  /* upload fun */
  const uploadFn = async params => {
    const form = new FormData();
    form.append('file', params.file);
    const result = await fileUpload(form);
    if (result) {
      params.success({
        url: result.data,
      });
    }
  };
  return (
    <div className="lv-admin-page-create">
      <BraftEditor
        placeholder="ctrl + s 保存"
        className="lv-admin-page-editor"
        value={preview.editorState}
        onChange={editorState => setPreview({ ...preview, editorState })}
        onSave={submitContent}
        excludeControls={excludeControls}
        media={{
          uploadFn,
        }}
      />
      {/* 标题-描述-分类设置 */}
      <BasicModal
        preview={preview}
        setPreview={setPreview}
        handle2Preview={handle2Preview}
      />

      {/* 预览 */}
      <Drawer
        width="80%"
        title="预览"
        closable={true}
        onClose={() => setPreview({ ...preview, showPreview: false })}
        visible={preview.showPreview}
        footer={
          <Space>
            <Button onClick={() => handleSave2Publish(true)} type="primary">
              发布/更新
            </Button>
            <Button onClick={() => handleSave2Publish(false)} type="primary">
              保存草稿箱
            </Button>
          </Space>
        }
      >
        <PreviewSimple preview={preview} />
        <Divider>华丽的分割线</Divider>
        <div
          className="lv-admin-page-create-preview-content braft-output-content"
          dangerouslySetInnerHTML={{ __html: preview.content }}
        ></div>
      </Drawer>
    </div>
  );
};
