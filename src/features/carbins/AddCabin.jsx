import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* it is possiblr to use the same modal for different windows
      <Modal.Open opens="table">
      <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
      <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

/* function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="">
      {" "}
      <Button onClick={() => setIsOpenModal((open) => !open)}>
        {" "}
        Add New Cabin{" "}
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
} */

export default AddCabin;
