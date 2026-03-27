import { RiAddLine, RiFolderLine, RiInformationLine } from "@remixicon/react";
import type React from "react";
import { useGroups } from "../../../application/hooks/useGroups";
import { GroupCard } from "../../components/GroupCard/GroupCard";
import "./GroupsPage.scss";

export const GroupsPage: React.FC = () => {
	const {
		storedGroups,
		composites,
		allRequests,
		newGroupName,
		isCreating,
		setNewGroupName,
		handleCreateGroup,
		handleDelete,
		handleAddRequest,
		handleRemoveRequest,
	} = useGroups();

	return (
		<div className="groups-page">
			{/* ── Header ── */}
			<header className="groups-page__header">
				<div className="groups-page__title-area">
					<h2>Request Groups</h2>
					<p>
						Organise your requests using the <strong>Composite pattern</strong>.
						Groups can contain requests and sub-groups; <code>count()</code> and{" "}
						<code>flatten()</code> propagate recursively through the entire
						tree.
					</p>
				</div>

				<form className="groups-page__create-form" onSubmit={handleCreateGroup}>
					<input
						id="new-group-name"
						type="text"
						placeholder="New group name…"
						value={newGroupName}
						onChange={(e) => setNewGroupName(e.target.value)}
						className="groups-page__input"
					/>
					<button
						id="create-group-btn"
						type="submit"
						className="groups-page__create-btn"
						disabled={isCreating || !newGroupName.trim()}
					>
						<RiAddLine size={16} /> Create Group
					</button>
				</form>
			</header>

			{/* ── Pattern explanation banner ── */}
			<div className="pattern-banner">
				<RiInformationLine size={16} />
				<span>
					<strong>Composite:</strong> cada <code>RequestGroup</code> implementa
					la misma interfaz <code>IRequestNode</code> que{" "}
					<code>RequestItem</code>. Agregar un grupo dentro de otro funciona de
					forma idéntica a agregar una solicitud individual.
				</span>
			</div>

			{/* ── Groups list ── */}
			<main className="groups-page__main">
				{storedGroups.length === 0 ? (
					<div className="groups-page__empty">
						<RiFolderLine size={56} />
						<h3>No groups yet</h3>
						<p>Create a group above to start organising your requests.</p>
					</div>
				) : (
					<div className="groups-list">
						{composites.map((composite, i) => (
							<GroupCard
								key={storedGroups[i].id}
								storedGroup={storedGroups[i]}
								composite={composite}
								allRequests={allRequests}
								onDelete={handleDelete}
								onAddRequest={handleAddRequest}
								onRemoveRequest={handleRemoveRequest}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
};
