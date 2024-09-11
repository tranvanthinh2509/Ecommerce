export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;

  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field " },
      ]);
    }
  }

  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "phone":
        const regex = /(()|0)(3|5|7|8|9)+([0-9]{8})\b/;
        if (!regex.test(arr[1])) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Phone invalid " },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Password minimum 6 charaters " },
          ]);
        }
        break;
      default:
        break;
    }
  }

  return invalids;
};
