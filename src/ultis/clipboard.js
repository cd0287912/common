import Clipboard from 'clipboard';
import { message } from 'antd';
export default function clipboardFn(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    message.success('复制成功');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    message.error('复制失败');
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
