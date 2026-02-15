"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { getContactSubmissions, deleteContactSubmission } from "@/lib/storage";
import { ContactSubmission } from "@/lib/types";

interface ContactSubmissionsProps {
  onUpdate: () => void;
}

const ITEMS_PER_PAGE = 10;

const ContactSubmissions: React.FC<ContactSubmissionsProps> = ({
  onUpdate,
}) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    setSubmissions(getContactSubmissions());
  };

  const handleDelete = (id: string) => {
    deleteContactSubmission(id);
    loadSubmissions();
    onUpdate();
    setDeleteConfirm(null);
  };

  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubmissions = submissions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
        Contact Submissions
      </h2>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No submissions yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Contact form submissions will appear here
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-dark)]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-dark)]">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-dark)]">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-dark)]">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-dark)]">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-dark)]">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--text-dark)]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-[var(--text-dark)] font-medium">
                      {submission.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <a
                        href={`mailto:${submission.email}`}
                        className="hover:text-[var(--olive-green)]"
                      >
                        {submission.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <a
                        href={`tel:${submission.phone}`}
                        className="hover:text-[var(--olive-green)]"
                      >
                        {submission.phone || "-"}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        {submission.project || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {submission.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(submission.submittedAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setDeleteConfirm(submission.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {paginatedSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[var(--text-dark)]">
                      {submission.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatDate(submission.submittedAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteConfirm(submission.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-500">Email:</span>{" "}
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-[var(--olive-green)]"
                    >
                      {submission.email}
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-500">Phone:</span>{" "}
                    <a
                      href={`tel:${submission.phone}`}
                      className="text-[var(--olive-green)]"
                    >
                      {submission.phone || "-"}
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-500">Project:</span>{" "}
                    <span className="font-medium">
                      {submission.project || "General"}
                    </span>
                  </p>
                  <p className="text-gray-600">{submission.message}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-dark)] mb-2">
                Delete Submission?
              </h3>
              <p className="text-gray-500 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  className="flex-1"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  className="flex-1"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactSubmissions;
