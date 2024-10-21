const validate = (payload, setInvalidFields) => {
  let invalids = 0;

  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Không thể để trống" },
      ]);
    }
  }

  console.log(formatPayload);

  let pass;
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "phone":
        const regex = /(()|0)(3|5|7|8|9)+([0-9]{8})\b/;
        if (!regex.test(arr[1])) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Sai định dạng số điện thoại VN" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Mật khẩu ít nhất 6 kí tự" },
          ]);
        } else {
          pass = arr[1];
        }
        break;
      case "confirmPassword":
        if (arr[1] !== pass) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Không giống mật khẩu" },
          ]);
        }
        break;

      default:
        break;
    }
  }

  return invalids;
};

export default validate;
