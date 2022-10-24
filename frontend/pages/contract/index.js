import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Popconfirm, Space } from "antd";
import axios from "axios";
import React, { useState } from "react";
import FormEditContract from "../../components/FormEditContract";
import FormNewContract from "../../components/FormNewContract";

export default function Index({ data,token }) {
  const [showModelAdd, setShowModelAdd] = useState(false);
  const [showModelEdit, setShowModelEdit] = useState(false);
  const [newdata, setNewdata] = useState(null);
  const [contractDetail, setContractDetail] = useState(null);

  let header = [
    "name",
    "mobile",
    "email",
    "country",
    "city",
    "birthDate",
    "contractStartDate",
    "contractEndDate",
    "status",
  ];
  let auth  = { headers: { Authorization: `Bearer ${token}`, } }
  console.log(auth);
  const GetData = () => {
    axios
      .get("http://localhost:8000/contract/crud/",auth)
      .then((res) => {
        setNewdata(res.data);
        setShowModelAdd(false);
        setShowModelEdit(false);
      })
      .catch((err) => {});
  };
const DeleteContract = (id) => {
  message.loading({ content: 'Loading...', key:'delete' });
    axios.delete(`http://localhost:8000/contract/crud/${id}/`,auth)
        .then((res) => {
            GetData();
            message.success({ content: 'Contract Deleted Successfully', key:'delete', duration: 2 });
        })
        .catch((err) => {});
};
  return (
    <div className="flex flex-col bg-white h-[100vh] max-w-[100vw]">
      <button
        className="bg-[#f17a3f] text-white p-2 rounded-md m-2 w-20"
        onClick={() => setShowModelAdd(true)}
      >
        Add New
      </button>
      {data && (
        <div className=" sm:-mx-6 lg:-mx-8 w-full">
          <p
          className="text-center text-2xl font-bold text-black"
          >
            Each user has private contracts that only he can see it
          </p>
          
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="">
              <table className="min-w-full border text-center">
                <thead className="border-b">
                  <tr>
                    {header.map((item, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                      >
                        {item}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(newdata ? newdata : data).map((item, index) => (
                    <tr className="bg-white border-b" key={item.id}>
                      {header.map((item2, index2) => (
                        <td
                          key={index2}
                          className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                        >
                          {item[item2]?.toString()}
                        </td>
                      ))}
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        <Space>
                          <EditOutlined
                            className="text-[#f17a3f] cursor-pointer"
                            onClick={() => {
                              setContractDetail(item);
                              setShowModelEdit(true);
                            }}
                          />
                          <Popconfirm
                            title="Are you sure to delete this contract?"
                            onConfirm={() => {DeleteContract(item.id)}}
                            >
                          <DeleteOutlined className="text-[#f17a3f] cursor-pointer" />
                          </Popconfirm>
                        </Space>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Modal
        title="New Contract"
        open={showModelAdd}
        width={1000}
        onCancel={() => setShowModelAdd(false)}
        footer={<Button onClick={() => setShowModelAdd(false)}>Cancel</Button>}
      >
        <FormNewContract GetData={GetData} auth={auth}/>
      </Modal>
      {showModelEdit && (
        <Modal
          title="Edit Contract"
          open={showModelEdit}
          onCancel={() => setShowModelEdit(false)}
          width={1000}
          footer={
            <Button onClick={() => setShowModelEdit(false)}>Cancel</Button>
          }
        >
          <FormEditContract
          auth={auth}
          showModelEdit={showModelEdit}
          GetData={GetData} detail={contractDetail} />
        </Modal>
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  let data = null;
  let token = context.req.cookies["token"] || null;
  try {
    const response = await axios(`http://localhost:8000/contract/crud/`,{ headers: { Authorization: `Bearer ${token}`, } });
    data = response.data;
  } catch (err) {}

  return { props: { data,token } };
}
