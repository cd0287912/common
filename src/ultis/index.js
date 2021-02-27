import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);
// how to use plugin in store?
const TOKEN = 'TOKEN';
const expire_time = new Date().getTime() + 1000 * 60 * 60 * 12;
export const getToken = () => {
  return store.get(TOKEN);
};
export const removeToken = () => {
  return store.remove(TOKEN);
};
export const setToken = value => {
  return store.set(TOKEN, value, expire_time);
};
/* =====================ultis=========================== */
export function formatDate(time, fmt) {
  if (time === undefined || '') {
    return;
  }
  const date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export const getBase64 = img => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
};
