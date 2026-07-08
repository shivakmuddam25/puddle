// app/admin-dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  AlertCircle,
  CheckCircle,
  RefreshCw,
  DollarSign,
  Calendar,
  TrendingUp,
  Shield,
  HelpCircle,
  ChevronRight,
  Clock,
  User,
  Mail,
  GraduationCap
} from 'lucide-react';

// ==================== Types ====================
interface Plan {
  id: string;
  grade_range_start: number;
  grade_range_end: number;
  monthly_price: number;
  yearly_price: number;
  currency: string;
  is_active: boolean;
  display_order: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface SupportTicket {
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

interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_type: 'parent' | 'admin';
  message: string;
  created_at: string;
}

// ==================== Support Component ====================
function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

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
    const styles: Record<string, string> = {
      open: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return styles[status] || styles.open;
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-orange-100 text-orange-700',
      high: 'bg-red-100 text-red-700'
    };
    return styles[priority] || styles.medium;
  };

  useEffect(() => {
    fetchTickets();
  }, []);

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

// ==================== Main Admin Dashboard ====================
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'plans' | 'support'>('plans');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    grade_range_start: 1,
    grade_range_end: 5,
    monthly_price: 500,
    yearly_price: 4200,
    description: '',
    display_order: 0
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeTab === 'plans') {
      fetchPlans();
    }
  }, [activeTab]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/plans');
      const data = await response.json();

      if (response.ok) {
        setPlans(data.plans || []);
      } else {
        if (response.status === 401) {
          router.push('/admin/login');
        } else {
          setError(data.error || 'Failed to fetch plans');
        }
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      router.push('/admin/login');
    }
  };

  const handleAddPlan = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Plan added successfully!');
        setIsAdding(false);
        setFormData({
          grade_range_start: 1,
          grade_range_end: 5,
          monthly_price: 500,
          yearly_price: 4200,
          description: '',
          display_order: 0
        });
        fetchPlans();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to add plan');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError('Network error');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdatePlan = async () => {
    if (!editingPlan) return;
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPlan)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Plan updated successfully!');
        setEditingPlan(null);
        fetchPlans();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || 'Failed to update plan');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError('Network error');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    try {
      const response = await fetch(`/api/admin/plans?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuccess('Plan deleted successfully!');
        fetchPlans();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete plan');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError('Network error');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleToggleActive = async (plan: Plan) => {
    try {
      const response = await fetch('/api/admin/plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...plan,
          is_active: !plan.is_active
        })
      });

      if (response.ok) {
        fetchPlans();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update plan status');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError('Network error');
      setTimeout(() => setError(null), 3000);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading && activeTab === 'plans') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-blue-800">Puddle Admin</span>
              </div>
              <span className="text-sm text-gray-500">
                {activeTab === 'plans' ? 'Subscription Plans Manager' : 'Support Tickets'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-3 font-medium ${activeTab === 'plans' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-6 py-3 font-medium ${activeTab === 'support' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Support Tickets
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'plans' && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
                <p className="text-gray-600 mt-1">Manage pricing plans for different grade ranges</p>
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Add New Plan
              </button>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-700">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {isAdding && (
              <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border-2 border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Add New Plan</h2>
                  <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade Range Start</label>
                    <input
                      type="number"
                      value={formData.grade_range_start}
                      onChange={(e) => setFormData({...formData, grade_range_start: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={1}
                      max={12}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade Range End</label>
                    <input
                      type="number"
                      value={formData.grade_range_end}
                      onChange={(e) => setFormData({...formData, grade_range_end: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={1}
                      max={12}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price (₹)</label>
                    <input
                      type="number"
                      value={formData.monthly_price}
                      onChange={(e) => setFormData({...formData, monthly_price: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yearly Price (₹)</label>
                    <input
                      type="number"
                      value={formData.yearly_price}
                      onChange={(e) => setFormData({...formData, yearly_price: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={0}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe this plan..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={handleAddPlan} disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {submitting ? 'Adding...' : 'Add Plan'}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yearly Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {plans.map((plan) => {
                      const yearlyDiscount = ((plan.monthly_price * 12 - plan.yearly_price) / (plan.monthly_price * 12) * 100).toFixed(0);
                      
                      return editingPlan?.id === plan.id ? (
                        <tr key={plan.id} className="bg-blue-50">
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <input type="number" value={editingPlan.grade_range_start} onChange={(e) => setEditingPlan({...editingPlan, grade_range_start: parseInt(e.target.value)})} className="w-20 px-2 py-1 border rounded" min={1} max={12} />
                              <span>-</span>
                              <input type="number" value={editingPlan.grade_range_end} onChange={(e) => setEditingPlan({...editingPlan, grade_range_end: parseInt(e.target.value)})} className="w-20 px-2 py-1 border rounded" min={1} max={12} />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <input type="number" value={editingPlan.monthly_price} onChange={(e) => setEditingPlan({...editingPlan, monthly_price: parseInt(e.target.value)})} className="w-32 px-2 py-1 border rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <input type="number" value={editingPlan.yearly_price} onChange={(e) => setEditingPlan({...editingPlan, yearly_price: parseInt(e.target.value)})} className="w-32 px-2 py-1 border rounded" />
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-green-600 font-medium">{yearlyDiscount}% off</span>
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleToggleActive(plan)} className={`px-2 py-1 text-xs rounded-full ${plan.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {plan.is_active ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <input type="number" value={editingPlan.display_order} onChange={(e) => setEditingPlan({...editingPlan, display_order: parseInt(e.target.value)})} className="w-16 px-2 py-1 border rounded" />
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={handleUpdatePlan} disabled={submitting} className="p-1 text-green-600 hover:bg-green-50 rounded"><Save size={18} /></button>
                            <button onClick={() => setEditingPlan(null)} className="p-1 text-gray-400 hover:bg-gray-100 rounded"><X size={18} /></button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={plan.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">Grade {plan.grade_range_start} - {plan.grade_range_end}</td>
                          <td className="px-6 py-4"><span className="flex items-center gap-1"><DollarSign size={14} className="text-gray-400" />{formatCurrency(plan.monthly_price)}</span></td>
                          <td className="px-6 py-4"><span className="flex items-center gap-1"><Calendar size={14} className="text-gray-400" />{formatCurrency(plan.yearly_price)}</span></td>
                          <td className="px-6 py-4"><span className="text-green-600 font-medium">{yearlyDiscount}% off</span></td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleToggleActive(plan)} className={`px-2 py-1 text-xs rounded-full ${plan.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {plan.is_active ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{plan.display_order}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={() => setEditingPlan(plan)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                            <button onClick={() => handleDeletePlan(plan.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {plans.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No subscription plans configured</p>
                  <button onClick={() => setIsAdding(true)} className="mt-3 text-blue-600 hover:text-blue-700">Add your first plan</button>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">📊 Pricing Guidelines</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Monthly plans: Charged on a recurring basis</li>
                <li>• Yearly plans: One-time annual payment with discount</li>
                <li>• Discount is calculated automatically: ((Monthly × 12 - Yearly) / (Monthly × 12) × 100)%</li>
                <li>• Plans can be activated/deactivated without deletion</li>
                <li>• Changes will be reflected immediately for new subscriptions</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'support' && <SupportTickets />}
    </div>
  );
}