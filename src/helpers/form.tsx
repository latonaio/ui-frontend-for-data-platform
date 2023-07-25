
// 小数点かどうかのチェック
export const isFloat = (x: any) => {
  console.log(1234)

  const numberValue = Number(x);

  if(!isNaN(numberValue)){
    return !Number.isInteger(numberValue);
  } else {
    return false;
  }
}
