import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/carbins/CabinTable";
import AddCabin from "../features/carbins/AddCabin";
import CabinTableOperations from "../features/carbins/CabinTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
