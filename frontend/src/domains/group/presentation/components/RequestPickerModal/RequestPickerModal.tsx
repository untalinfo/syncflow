import { RiCheckLine } from "@remixicon/react";
import type React from "react";
import type { SyncRequest } from "../../../../../shared/application/types/IRequestNode";
import { Modal } from "../../../../../shared/presentation/components/Modal/Modal";
import "./RequestPickerModal.scss";

interface RequestPickerModalProps {
	availableRequests: SyncRequest[];
	alreadyAssigned: string[];
	onAssign: (requestId: string) => void;
	onClose: () => void;
}

export const RequestPickerModal: React.FC<RequestPickerModalProps> = ({
	availableRequests,
	alreadyAssigned,
	onAssign,
	onClose,
}) => {
	const unassigned = availableRequests.filter(
		(r) => !alreadyAssigned.includes(r.id),
	);

	return (
		<Modal onClose={onClose}>
			<div
				className="picker-modal"
				role="dialog"
				aria-labelledby="picker-title"
			>
				<h3 id="picker-title">Add Request to Group</h3>
				{unassigned.length === 0 ? (
					<p className="picker-empty">
						All requests are already in this group.
					</p>
				) : (
					<ul className="picker-list">
						{unassigned.map((req) => (
							<li key={req.id} className="picker-item">
								<div className="picker-item__info">
									<span
										className={`picker-dot picker-dot--${req.status.toLowerCase()}`}
									/>
									<span className="picker-item__name">{req.name}</span>
									<code className="picker-item__type">{req.type}</code>
								</div>
								<button
									type="button"
									className="picker-item__btn"
									onClick={() => onAssign(req.id)}
									aria-label={`Add ${req.name}`}
								>
									<RiCheckLine size={15} /> Add
								</button>
							</li>
						))}
					</ul>
				)}
				<button type="button" className="picker-close-btn" onClick={onClose}>
					Close
				</button>
			</div>
		</Modal>
	);
};
