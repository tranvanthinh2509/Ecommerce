import { Button, Item } from "../../components";
function List() {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-300">
      <div className="p-2">
        <h1 className="text-xl font-bold">Tổng 999 kết quả</h1>
        <div className="flex items-center gap-2 my-2">
          <span>Sắp xếp: </span>
          <Button bgColor="bg-gray-200" text="Mặc định" />
          <Button bgColor="bg-gray-200" text="Mới nhất" />
        </div>
      </div>
      <div>
        <Item />
      </div>
    </div>
  );
}

export default List;
