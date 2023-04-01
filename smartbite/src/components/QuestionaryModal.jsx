import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function QuestionaryModal() {
    

    return (
        <div className="footer container-fluid p-0 mt-auto d-flex justify-content-center align-items-center font-weight-bold">
           <button>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
           <button>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}