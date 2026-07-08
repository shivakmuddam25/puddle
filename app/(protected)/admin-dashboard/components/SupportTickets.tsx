"use client";

import { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  X,
  ChevronRight,
  HelpCircle,
  Clock,
  User,
  Mail,
  GraduationCap
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  admin_response: string | null;
  responded_at: string | null;
  resolved_at: string | null;
  parent_name: string;
  parent_email: string;
  student_name: string | null;
}

interface Message {
  id: string;
  ticket_id: string;
  sender_type: 'parent' | 'admin';
  message: string;
  created_at: string;
}

export default function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/support-tickets');
      const data = await res.json();
      if (res.ok) {
        setTickets(data.tickets || []);
      } else {
        setError(data.error || 'Failed to load tickets');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketDetails = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/admin/support-tickets/${ticketId}`);
      const data = await res.json();
      if (res.ok) {
        setSelectedTicket(data.ticket);
        setMessages(data.messages || []);
        setNewStatus(data.ticket.status);
        setNewPriority(data.ticket.priority);
      } else {
        setError(data.error || 'Failed to load ticket details');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const updateTicket = async () => {
    if (!selectedTicket) return;
    setSubmitting(true);
    try {
      const payload: any = {};
      if (newStatus !== selectedTicket.status) payload.status = newStatus;
      if (newPriority !== selectedTicket.priority) payload.priority = newPriority;
      if (replyText.trim()) payload.adminResponse = replyText.trim();

      if (Object.keys(payload).length === 0) {
        setSubmitting(false);
        return;
      }

      const res = await fetch(`/api/admin/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        // Refresh ticket list and details
        await fetchTickets();
        if (selectedTicket) await fetchTicketDetails(selectedTicket.id);
        setReplyText('');
      } else {
        setError(data.error || 'Update failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return styles[status as keyof typeof styles] || styles.open;
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-orange-100 text-orange-700',
      high: 'bg-red-100 text-red-700'
    };
    return styles[priority as keyof typeof styles] || styles.medium;
  };

  const filteredTickets = filterStatus === 'all'
    ? tickets
    : tickets.filter(t => t.status === filterStatus);

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Support Tickets</h2>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={fetchTickets}
                className="text-sm text-blue-600 border rounded-lg px-3 py-1 hover:bg-blue-50 flex items-center gap-1"
              >
                <RefreshCw size={14} /> Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <HelpCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No support tickets found.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => fetchTicketDetails(ticket.id)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(ticket.status)}`}>
                        {ticket.status.toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ticket.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {ticket.parent_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {ticket.parent_email}
                      </span>
                      {ticket.student_name && (
                        <span className="flex items-center gap-1">
                          <GraduationCap size={12} /> {ticket.student_name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {new Date(ticket.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedTicket.subject}</h3>
                <div className="flex gap-2 mt-1">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="text-xs px-2 py-1 rounded border"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="text-xs px-2 py-1 rounded border"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Parent/Student Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Parent:</span> {selectedTicket.parent_name} ({selectedTicket.parent_email})
                </div>
                {selectedTicket.student_name && (
                  <div>
                    <span className="text-gray-500">Student:</span> {selectedTicket.student_name}
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Created:</span> {new Date(selectedTicket.created_at).toLocaleString()}
                </div>
                {selectedTicket.responded_at && (
                  <div>
                    <span className="text-gray-500">Last Response:</span> {new Date(selectedTicket.responded_at).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Original Description */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div className="space-y-3 mb-4">
                <h4 className="font-medium text-gray-900">Conversation</h4>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.sender_type === 'admin'
                        ? 'bg-blue-50 ml-6'
                        : 'bg-gray-100 mr-6'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium text-gray-500">
                        {msg.sender_type === 'admin' ? 'Admin' : 'Parent'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Admin Reply Form */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Response</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Type your response here..."
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={updateTicket}
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Update & Send'}
                </button>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Ticket ID: {selectedTicket.id}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}