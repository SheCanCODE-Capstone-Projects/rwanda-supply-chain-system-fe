"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";

const initialMembers = [
  { id: 1, name: "John", role: "Admin" },
  { id: 2, name: "Alice", role: "Manager" },
];

export default function TeamMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [draftName, setDraftName] = useState("");
  const [draftRole, setDraftRole] = useState("Manager");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draftName.trim()) return;

    if (editingId) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingId ? { ...member, name: draftName.trim(), role: draftRole } : member
        )
      );
      setEditingId(null);
    } else {
      setMembers((current) => [
        ...current,
        { id: Date.now(), name: draftName.trim(), role: draftRole },
      ]);
    }

    setDraftName("");
    setDraftRole("Manager");
  };

  const startEditing = (member) => {
    setDraftName(member.name);
    setDraftRole(member.role);
    setEditingId(member.id);
  };

  const cancelEditing = () => {
    setDraftName("");
    setDraftRole("Manager");
    setEditingId(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#061226]">Team members</h3>
          <p className="text-sm text-gray-600">Manage the people who can access the organization workspace.</p>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={() => setEditingId(null)}>
          <Plus className="mr-2 h-4 w-4" /> Add member
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-gray-700">
            <span>Name</span>
            <input
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#0B6B2E]"
              placeholder="Enter team member name"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-gray-700">
            <span>Role</span>
            <select
              value={draftRole}
              onChange={(event) => setDraftRole(event.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:ring-2 focus:ring-[#0B6B2E]"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Member">Member</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="primary" size="sm">
            {editingId ? "Save changes" : "Add member"}
          </Button>
          {editingId ? (
            <Button type="button" variant="secondary" size="sm" onClick={cancelEditing}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3 font-medium text-[#061226]">{member.name}</td>
                <td className="px-4 py-3">
                  <Badge>{member.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" size="sm" onClick={() => startEditing(member)}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => setMembers((current) => current.filter((item) => item.id !== member.id))}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
