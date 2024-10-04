import { Metadata } from "@/interfaces/user";
import { Button } from "./ui/button";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
interface PaginatorProps {
  metadata: Metadata;
  onNext: () => void;
  onPrev: () => void;
}

function Paginator({ metadata, onNext, onPrev }: PaginatorProps) {
  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        onClick={onPrev}
        disabled={metadata.currentPage === 1}
        className="p-4 text-lg font-bold"
      >
        <GrFormPrevious className="text-2xl" />
      </Button>

      <Button
        variant="ghost"
        onClick={onNext}
        disabled={metadata.currentPage === metadata.totalPages}
        className="p-4 text-lg font-bold"
      >
        <MdOutlineNavigateNext className="text-2xl" />
      </Button>
    </div>
  );
}

export default Paginator;
