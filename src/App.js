import { useState, useEffect } from "react";
import TableComponent from "./Components/TableComponent";
import sanitySetup from "./sanitySetup";
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import {
  Text,
  Container,
  Input,
  Button,
} from '@chakra-ui/react'

function App() {
  const [client, setClient] = useState(sanitySetup);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [nameList, setNameList] = useState([]);

  // Get data from Sanity
  useEffect(() => {
      (async () => {
        const result = await client.fetch(`*[_type == "author"]`);
        if(result.length < 0) return toast.loading(`Loading data from Sanity.io`,{
          position: 'top-center',
        })
        setNameList(result);
      })();
  }, []);

  // Add data function
  const addData = async () => {
    const addData = await client.create({
      _type: "author",
      name: name,
    });
    toast.success(`Add name successfully ${name}`,{
      position: 'top-center',
    });
    setNameList([...nameList, addData]);
    setName("");
    console.log(addData);
  };

  // Delete data function
  const deletData = async (id) => { 
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        client.delete(id);
        setNameList(nameList.filter(item => item._id !== id));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    })
  }

  // Edit data function
  const editData = async (id, name) => {
    setName(name);
    setID(id);
    console.log(id)
   }

  // Update data function
  const updateData = async () => {

    const updateData = await client.patch(id).set({name: name}).commit();
    console.log(updateData);
    setNameList([...nameList.filter(item => item._id !== id), updateData]);
    toast.success(`Update name successfully ${name}`,{
      position: 'top-center',
    });
    setName("");
    setID("");
  }
  
  return (
    <Container>
      <Toaster />
      <Text fontSize='4xl'>React with Sanity.io</Text>
      <hr/>
      <Input
        mt={4}
        type="text"
        placeholder="Enter your name"
        size='sm'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {id ? (<Button colorScheme="blue" onClick={updateData} size="sm" mt={2}>Update</Button>) : (<Button colorScheme="blue" onClick={addData} size="sm" mt={2}>Submit</Button>)}
    
      <TableComponent client={{client,nameList,deletData,editData}} />
    </Container>
  );
}

export default App;
