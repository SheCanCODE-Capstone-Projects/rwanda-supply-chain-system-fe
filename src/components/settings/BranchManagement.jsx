"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge, Button, Card, Input } from "@/components/ui";

const initialBranches = [
  { id: 1, name: "Kigali Branch" },
  { id: 2, name: "Huye Branch" },
  { id: 3, name: "Musanze Branch" },
];

export default function BranchManagement() {
  const [branches, setBranches] = useState(initialBranches);
  const [draftName, setDraftName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draftName.trim()) return;

    if (editingId) {
      setBranches((current) =>
        current.map((branch) =>
          branch.id === editingId ? { ...branch, name: draftName.trim() } : branch
        )
      );
      setEditingId(null);
    } else {
      setBranches((current) => [
        ...current,
        { id: Date.now(), name: draftName.trim() },
      ]);
    }

    setDraftName("");
  };

  const startEditing = (branch) => {
    setDraftName(branch.name);
    setEditingId(branch.id);
  };

  const cancelEditing = () => {
    setDraftName("");
    setEditingId(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#061226]">Branches</h3>
          <p className="text-sm text-gray-600">Manage warehouse and office locations for the organization.</p>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={() => setEditingId(null)}>
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <Input
          label="Branch name"
          placeholder="Enter branch name"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="primary" size="sm">
            {editingId ? "Save changes" : "Add branch"}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" size="sm" onClick={cancelEditing}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="space-y-2">
        {branches.map((branch) => (
          <div key={branch.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 p-4">
            <div>
              <p className="font-medium text-[#061226]">{branch.name}</p>
              <p className="text-sm text-gray-500">Primary operating location</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => startEditing(branch)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => setBranches((current) => current.filter((item) => item.id !== branch.id))}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
