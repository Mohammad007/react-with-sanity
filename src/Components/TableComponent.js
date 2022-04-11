import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button
} from '@chakra-ui/react'

export default function TableComponent({client}) {

  return (
<TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {!client.nameList
         ? (<Tr>
          <Td></Td>
          <Td>Loading...</Td>
          <Td></Td>
        </Tr>)
         : client.nameList.map(item => 
          <Tr key={item._id}>
          <Td>{item._id.substr(0,8)}</Td>
          <Td>{item.name}</Td>
          <Td>
            <Button colorScheme="blue" size="sm" onClick={() => client.editData(item._id, item.name)}>Edit</Button>
            &nbsp;
            <Button colorScheme="red" size="sm" onClick={() => client.deletData(item._id)}>Delete</Button>

          </Td>
        </Tr>
    )}
    </Tbody>
  </Table>
</TableContainer>
  )
}
