// app/(protected)/parent-dashboard/page.tsx
"use client";

import Link from 'next/link';
import { 
  Users,
  CreditCard,
  Settings,
  LogOut,
  Plus,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  RefreshCw,
  BookOpen,
  AlertCircle,
  ExternalLink,
  Wallet,
  History,
  IndianRupee,
  Smartphone,
  CheckCircle,
  QrCode,
  Copy,
  Star,
  Trash2,
  ChevronRight,
  Home,
  Edit,
  GraduationCap,
  Gift,
  Clock,
  X,
  AlertTriangle,
  HelpCircle,
  Award
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserProfile from '@/components/UserProfile';
import { Printer } from 'lucide-react';

interface Child {
  id: string;
  userId: string;
  name: string;
  email: string;
  grade: string;
  gradeLevel: number;
  board: string;
  boardId?: string;
  school: string;
  gender?: string;
  progress: number;
  activeCourses: number;
  isActive: boolean;
  subscriptionStatus?: 'active' | 'expired' | 'free_trial' | 'none';
  subscriptionEndDate?: string;
  freeTrialEndDate?: string;
  freeTrialUsed?: boolean;
  activeGrades?: Array<{
    gradeLevel: number;
    subscriptionId: string;
    endDate: string;
    startDate: string;
    billingCycle: string;
  }>;
}

interface Payment {
  id: string;
  amount: number;
  description: string;
  status: string;
  payment_date: string;
  payment_method?: string;
  child_name?: string;
  transaction_id?: string;
  invoice_number?: string;
}

interface SavedPaymentMethod {
  id: string;
  payment_type: 'card' | 'upi';
  card_last4?: string;
  card_brand?: string;
  card_holder_name?: string;
  card_expiry?: string;
  upi_id?: string;
  masked_details?: string;
  is_default: boolean;
}

interface Plan {
  id: string;
  grade_range_start: number;
  grade_range_end: number;
  monthly_price: number;
  yearly_price: number;
  description: string;
  is_active: boolean;
  display_order: number;
}

export default function ParentDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [children, setChildren] = useState<Child[]>([]);
  const [parentData, setParentData] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [savedMethods, setSavedMethods] = useState<SavedPaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [targetGrade, setTargetGrade] = useState<number | null>(null);
  const [renewingGrade, setRenewingGrade] = useState<number | null>(null);
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('card');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [paymentDescription, setPaymentDescription] = useState('');
  const [showSaveMethod, setShowSaveMethod] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [selectedSavedMethod, setSelectedSavedMethod] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emailNotifications: true,
    paymentReminders: true,
    weeklyReports: false
  });
  
  	// Add state for showing grade change notification
	const [showGradeChangeNotification, setShowGradeChangeNotification] = useState(false);
	const [gradeChangedChild, setGradeChangedChild] = useState<Child | null>(null);

	// Check for recently grade-changed children
	useEffect(() => {
	  const recentlyChanged = children.find(c => 
		c.subscriptionStatus === 'inactive' && 
		c.isActive === false
	  );
	  
	  if (recentlyChanged) {
		setGradeChangedChild(recentlyChanged);
		setShowGradeChangeNotification(true);
	  }
	}, [children]);

	// Add this notification component in the dashboard
	{showGradeChangeNotification && gradeChangedChild && (
	  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
		<div className="flex items-start gap-3">
		  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
		  <div className="flex-1">
			<h3 className="font-semibold text-yellow-800">Grade Changed for {gradeChangedChild.name}</h3>
			<p className="text-sm text-yellow-700 mt-1">
			  The grade has been updated to {gradeChangedChild.grade}. Previous subscriptions have been invalidated.
			</p>
			<button
			  onClick={() => {
				setShowGradeChangeNotification(false);
				openSubscriptionModal(gradeChangedChild);
			  }}
			  className="mt-3 text-sm bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
			>
			  Enroll in Grade {gradeChangedChild.grade} Now
			</button>
		  </div>
		  <button
			onClick={() => setShowGradeChangeNotification(false)}
			className="text-yellow-600 hover:text-yellow-700"
		  >
			<X size={18} />
		  </button>
		</div>
	  </div>
	)}
	
	
	
	
// State for support
const [supportTickets, setSupportTickets] = useState<any[]>([]);
const [showTicketModal, setShowTicketModal] = useState(false);
const [selectedTicket, setSelectedTicket] = useState<any>(null);
const [ticketMessages, setTicketMessages] = useState<any[]>([]);
const [newTicketSubject, setNewTicketSubject] = useState('');
const [newTicketDesc, setNewTicketDesc] = useState('');
const [newTicketStudentId, setNewTicketStudentId] = useState('');
const [newTicketPriority, setNewTicketPriority] = useState('medium');
const [replyMessage, setReplyMessage] = useState('');
const [submitting, setSubmitting] = useState(false);

// Fetch tickets on mount
useEffect(() => {
  if (activeTab === 'support') {
    fetchSupportTickets();
  }
}, [activeTab]);

const fetchSupportTickets = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/parent/support-tickets', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) setSupportTickets(data.tickets || []);
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};

const fetchTicketDetails = async (ticketId: string) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`/api/parent/support-tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      setSelectedTicket(data.ticket);
      setTicketMessages(data.messages || []);
    }
  } catch (error) {
    console.error('Error fetching ticket details:', error);
  }
};

const createTicket = async () => {
  if (!newTicketSubject || !newTicketDesc) {
    setError('Please fill in subject and description');
    return;
  }
  setSubmitting(true);
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/parent/support-tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject: newTicketSubject,
        description: newTicketDesc,
        studentId: newTicketStudentId || null,
        priority: newTicketPriority
      })
    });
    const data = await res.json();
    if (res.ok) {
      setSaveSuccess('Ticket created successfully!');
      setShowTicketModal(false);
      setNewTicketSubject('');
      setNewTicketDesc('');
      setNewTicketStudentId('');
      setNewTicketPriority('medium');
      fetchSupportTickets();
    } else {
      setError(data.error || 'Failed to create ticket');
    }
  } catch (error) {
    setError('Error creating ticket');
  } finally {
    setSubmitting(false);
  }
};

const addReply = async () => {
  if (!replyMessage) return;
  setSubmitting(true);
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`/api/parent/support-tickets/${selectedTicket.id}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ message: replyMessage })
    });
    if (res.ok) {
      setReplyMessage('');
      // Refresh messages
      fetchTicketDetails(selectedTicket.id);
      fetchSupportTickets(); // to update status if reopened
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to send reply');
    }
  } catch (error) {
    setError('Error sending reply');
  } finally {
    setSubmitting(false);
  }
};



  
  // Subscription plans state
  const [subscriptionPlans, setSubscriptionPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'yearly'>('monthly');
  const [enrollingChild, setEnrollingChild] = useState<string | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showGradeChangeModal, setShowGradeChangeModal] = useState(false);
  const [gradeChangeReason, setGradeChangeReason] = useState('');
  const [selectedChildForGradeChange, setSelectedChildForGradeChange] = useState<Child | null>(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [selectedChildForSubscription, setSelectedChildForSubscription] = useState<Child | null>(null);
  const [showAddPaymentMethodForm, setShowAddPaymentMethodForm] = useState(false);

  // Fetch subscription plans
  const fetchSubscriptionPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      const data = await response.json();
      if (response.ok && data.plans) {
        setSubscriptionPlans(data.plans.filter((p: Plan) => p.is_active));
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };


// In parent-dashboard/page.tsx - Update fetchChildSubscriptionStatus

const fetchChildSubscriptionStatus = async (childId: string) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/api/student/subscription-status?studentId=${childId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    
    console.log('Subscription status response:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
};


const updateChildrenWithStatus = async (childrenList: Child[]) => {
  try {
    const token = localStorage.getItem('authToken');
    
    const updatedChildren = await Promise.all(
      childrenList.map(async (child) => {
        try {
          // Fetch subscription status for this child
          const response = await fetch(`/api/student/subscription-status?studentId=${child.id}`, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            console.error(`Failed to fetch status for child ${child.id}:`, response.status);
            return {
              ...child,
              subscriptionStatus: 'none',
              subscriptionEndDate: null,
              freeTrialEndDate: null,
              freeTrialUsed: false,
              activeGrades: []
            };
          }
          
          const data = await response.json();
          
          console.log(`Subscription status for ${child.name}:`, {
            hasAccess: data.hasAccess,
            isFreeTrial: data.isFreeTrial,
            subscriptionEndDate: data.subscriptionEndDate,
            activeGrades: data.activeGrades,
            totalActiveGrades: data.totalActiveGrades
          });
          
          // Calculate subscription status
          let subscriptionStatus: 'active' | 'expired' | 'free_trial' | 'none' = 'none';
          let subscriptionEndDate = null;
          let freeTrialEndDate = null;
          let freeTrialUsed = data.freeTrialUsed || false;
          let activeGrades = data.activeGrades || [];
          
          if (data.hasAccess) {
            if (data.isFreeTrial) {
              subscriptionStatus = 'free_trial';
              freeTrialEndDate = data.freeTrialEndDate;
            } else {
              subscriptionStatus = 'active';
              // Get the most recent subscription end date
              if (activeGrades.length > 0) {
                subscriptionEndDate = activeGrades[0].endDate;
              } else if (data.subscriptionEndDate) {
                subscriptionEndDate = data.subscriptionEndDate;
              }
            }
          } else {
            subscriptionStatus = 'none';
          }
          
          // Check if any subscription is expired but was active
          if (!data.hasAccess && (data.freeTrialUsed || (data.activeSubscriptions && data.activeSubscriptions.length > 0))) {
            subscriptionStatus = 'expired';
          }
          
          return {
            ...child,
            subscriptionStatus,
            subscriptionEndDate,
            freeTrialEndDate,
            freeTrialUsed,
            activeGrades,
            isActive: data.hasAccess || subscriptionStatus === 'free_trial' // Student is active if they have any access
          };
          
        } catch (error) {
          console.error(`Error fetching status for child ${child.id}:`, error);
          return {
            ...child,
            subscriptionStatus: 'none',
            subscriptionEndDate: null,
            freeTrialEndDate: null,
            freeTrialUsed: false,
            activeGrades: [],
            isActive: false
          };
        }
      })
    );
    
    setChildren(updatedChildren);
    return updatedChildren;
    
  } catch (error) {
    console.error('Error updating children status:', error);
    return childrenList;
  }
};


  // Enroll in free trial (only if never used before)
  const handleFreeTrialEnrollment = async (childId: string, gradeLevel: number, boardId: string) => {
    setEnrollmentLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/student/free-trial/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          studentId: childId,
          gradeLevel: gradeLevel,
          boardId: boardId
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSaveSuccess('Free trial started successfully! Your child now has 14 days of access.');
        setShowEnrollmentModal(false);
        setEnrollingChild(null);
        fetchDashboardData();
      } else {
        setError(data.error || 'Failed to start free trial');
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.error('Free trial error:', error);
      setError('Error starting free trial. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Handle subscribe button click (from subscription modal)
  const handleSubscribe = () => {
    setShowSubscriptionModal(false);
    // Switch to payments tab and scroll to payment form
    setActiveTab('payments');
    setTimeout(() => {
      const paymentForm = document.getElementById('payment-form');
      if (paymentForm) {
        paymentForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Request grade change
  const handleGradeChangeRequest = async () => {
    if (!selectedChildForGradeChange) return;
    
    setEnrollmentLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/parent/request-grade-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: selectedChildForGradeChange.id,
          fromGrade: selectedChildForGradeChange.gradeLevel,
          toGrade: selectedChildForGradeChange.gradeLevel + 1,
          reason: gradeChangeReason
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSaveSuccess('Grade change request submitted. Support will review and contact you.');
        setShowGradeChangeModal(false);
        setSelectedChildForGradeChange(null);
        setGradeChangeReason('');
      } else {
        setError(data.error || 'Failed to submit request');
      }
    } catch (error) {
      setError('Error submitting request');
    } finally {
      setEnrollmentLoading(false);
    }
  };

  // Mark course as completed
  const handleMarkComplete = async (childId: string, gradeLevel: number) => {
    if (!confirm('Are you sure you want to mark this course as completed? This will revoke access to the course material.')) return;
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/student/mark-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: childId,
          gradeLevel: gradeLevel
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSaveSuccess('Course marked as completed!');
        fetchDashboardData();
      } else {
        setError(data.error || 'Failed to mark course as completed');
      }
    } catch (error) {
      setError('Error marking course as completed');
    }
  };

  const handleToggleChildStatus = async (childId: string, childName: string, isCurrentlyActive: boolean) => {
    const action = isCurrentlyActive ? 'deactivate' : 'activate';
    const confirmed = confirm(`Are you sure you want to ${action} ${childName}?`);
    
    if (!confirmed) return;
    
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/parent/children/${childId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !isCurrentlyActive })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSaveSuccess(`${childName} has been ${action}d successfully!`);
        setTimeout(() => setSaveSuccess(null), 3000);
        fetchDashboardData();
      } else {
        throw new Error(data.error || `Failed to ${action} child`);
      }
    } catch (error: any) {
      setError(error.message || `Failed to ${action} child`);
      setTimeout(() => setError(null), 3000);
    }
  };
  
  const exportPayments = () => {
    if (payments.length === 0) {
      alert('No payment data to export');
      return;
    }

    let csvContent = '';
    csvContent += 'Date,Amount (₹),Description,Status,Payment Method,For Child,Transaction ID,Invoice Number\n';
    
    payments.forEach(p => {
      const row = [
        formatDate(p.payment_date),
        p.amount.toFixed(2),
        (p.description || 'Course Payment').replace(/,/g, ';'),
        p.status.toUpperCase(),
        p.payment_method === 'card' ? 'Card' : p.payment_method === 'upi' ? 'UPI' : p.payment_method || 'N/A',
        (p.child_name || 'General').replace(/,/g, ';'),
        p.transaction_id || 'N/A',
        p.invoice_number || 'N/A'
      ].join(',');
      csvContent += row + '\n';
    });
    
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const completedTotal = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const pendingTotal = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    
    csvContent += '\n';
    csvContent += 'PAYMENT SUMMARY\n';
    csvContent += `Total Transactions,${payments.length}\n`;
    csvContent += `Total Amount,₹${totalAmount.toFixed(2)}\n`;
    csvContent += `Completed Amount,₹${completedTotal.toFixed(2)}\n`;
    csvContent += `Pending Amount,₹${pendingTotal.toFixed(2)}\n`;
    csvContent += `Completed Payments,${payments.filter(p => p.status === 'completed').length}\n`;
    csvContent += `Pending Payments,${payments.filter(p => p.status === 'pending').length}\n`;
    csvContent += `Failed Payments,${payments.filter(p => p.status === 'failed').length}\n`;
    csvContent += '\n';
    csvContent += `Report Generated On,${new Date().toLocaleString()}\n`;
    csvContent += `Parent Name,${parentData?.name || 'Parent'}\n`;
    csvContent += `Parent Email,${parentData?.email || 'N/A'}\n`;
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_${parentData?.name?.replace(/\s/g, '_') || 'parent'}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  const printPayments = () => {
    const printContent = document.getElementById('payment-history-content');
    if (!printContent) return;

    const originalTitle = document.title;
    document.title = 'Payment History Report';
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const parentName = parentData?.name || 'Parent';
    const parentEmail = parentData?.email || '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment History Report - ${parentName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #333; }
          .header h1 { margin: 0; color: #333; font-size: 24px; }
          .header .parent-info { margin-top: 10px; color: #666; font-size: 14px; }
          .header .report-date { margin-top: 10px; font-size: 12px; color: #888; }
          .summary { display: flex; justify-content: space-between; margin-bottom: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px; }
          .summary-item { text-align: center; flex: 1; }
          .summary-item label { font-size: 12px; color: #666; display: block; margin-bottom: 5px; }
          .summary-item value { font-size: 18px; font-weight: bold; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .status-completed { color: green; font-weight: bold; }
          .status-pending { color: orange; font-weight: bold; }
          .status-failed { color: red; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
          @media print { body { margin: 0; padding: 20px; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Puddle - Payment History Report</h1>
          <div class="parent-info">
            <p><strong>Parent Name:</strong> ${parentName}</p>
            ${parentEmail ? `<p><strong>Email:</strong> ${parentEmail}</p>` : ''}
          </div>
          <div class="report-date"><p>Generated on: ${currentDate}</p></div>
        </div>
        <div class="summary">
          <div class="summary-item"><label>Total Transactions</label><value>${payments.length}</value></div>
          <div class="summary-item"><label>Total Amount</label><value>${formatCurrency(totalAmount)}</value></div>
          <div class="summary-item"><label>Completed Payments</label><value>${payments.filter(p => p.status === 'completed').length}</value></div>
        </div>
         <table>
          <thead>
            <tr><th>Date</th><th>Amount</th><th>Description</th><th>Status</th><th>Payment Method</th><th>For Child</th></tr>
          </thead>
          <tbody>
            ${payments.map(p => `<tr><td>${formatDate(p.payment_date)}</td><td>${formatCurrency(p.amount)}</td><td>${p.description || 'Course Payment'}</td><td class="status-${p.status}">${p.status.toUpperCase()}</td><td>${p.payment_method === 'card' ? 'Card' : p.payment_method === 'upi' ? 'UPI' : '-'}</td><td>${p.child_name || 'General'}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="footer"><p>This is a system-generated report. For any queries, please contact support.</p><p>&copy; ${new Date().getFullYear()} Puddle</p></div>
        <div class="no-print" style="text-align: center; margin-top: 20px;"><button onclick="window.print();" style="padding: 10px 20px; margin: 10px; cursor: pointer;">Print</button><button onclick="window.close();" style="padding: 10px 20px; margin: 10px; cursor: pointer;">Close</button></div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    document.title = originalTitle;
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSaveSuccess(null);
      
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login again');
        setSaving(false);
        return;
      }
      
      const settingsData = {
        phone: settingsForm.phone,
        address: settingsForm.address,
        emailNotifications: settingsForm.emailNotifications,
        paymentReminders: settingsForm.paymentReminders,
        weeklyReports: settingsForm.weeklyReports
      };
      
      const response = await fetch('/api/parent/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(settingsData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        if (result.data) {
          setParentData(result.data);
          setSettingsForm({
            name: result.data.name || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            address: result.data.address || '',
            emailNotifications: result.data.emailNotifications !== undefined ? result.data.emailNotifications : true,
            paymentReminders: result.data.paymentReminders !== undefined ? result.data.paymentReminders : true,
            weeklyReports: result.data.weeklyReports || false
          });
        }
        setSaveSuccess('Settings saved successfully!');
        setTimeout(() => setSaveSuccess(null), 3000);
      } else {
        throw new Error(result.error || 'Failed to save settings');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to save settings');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login again');
        setLoading(false);
        return;
      }
      
      const childrenRes = await fetch('/api/parent/children', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (childrenRes.ok) {
        const data = await childrenRes.json();
        await updateChildrenWithStatus(data.children || []);
      }
      
      const timestamp = Date.now();
      const profileRes = await fetch(`/api/parent/profile?_t=${timestamp}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
      if (profileRes.ok) {
        const data = await profileRes.json();
        setParentData(data);
        setSettingsForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          emailNotifications: data.emailNotifications !== undefined ? data.emailNotifications : true,
          paymentReminders: data.paymentReminders !== undefined ? data.paymentReminders : true,
          weeklyReports: data.weeklyReports || false
        });
      }
      
      const paymentsRes = await fetch('/api/parent/payments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (paymentsRes.ok) {
        const data = await paymentsRes.json();
        setPayments(data.payments || []);
        setSavedMethods(data.savedMethods || []);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (refreshKey > 0) {
      console.log('Refresh triggered, updating UI...');
    }
  }, [refreshKey]);

  const handleRefreshSettings = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login again');
        setSaving(false);
        return;
      }
      
      const profileRes = await fetch('/api/parent/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (profileRes.ok) {
        const data = await profileRes.json();
        setParentData(data);
        setSettingsForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          emailNotifications: data.emailNotifications !== undefined ? data.emailNotifications : true,
          paymentReminders: data.paymentReminders !== undefined ? data.paymentReminders : true,
          weeklyReports: data.weeklyReports || false
        });
        setSaveSuccess('Settings refreshed!');
        setTimeout(() => setSaveSuccess(null), 3000);
      } else {
        setError('Failed to refresh settings');
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      setError('Failed to refresh settings');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchSubscriptionPlans();
  }, []);

  const handleSetDefaultMethod = async (methodId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login again');
        return;
      }
      
      const response = await fetch('/api/parent/payments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ methodId, setDefault: true })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        await fetchDashboardData();
        setSaveSuccess('Default payment method updated!');
        setTimeout(() => setSaveSuccess(null), 3000);
      } else {
        throw new Error(data.error || 'Failed to set default');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to set default payment method');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteMethod = async (methodId: string) => {
    if (!confirm('Remove this payment method?')) return;
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('Please login again');
        return;
      }
      
      const response = await fetch(`/api/parent/payments?id=${methodId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        await fetchDashboardData();
        if (selectedSavedMethod === methodId) {
          setSelectedSavedMethod(null);
        }
        setSaveSuccess('Payment method removed successfully!');
        setTimeout(() => setSaveSuccess(null), 3000);
      } else {
        throw new Error(data.error || 'Failed to remove payment method');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to remove payment method');
      setTimeout(() => setError(null), 3000);
    }
  };
  
  const handleUseSavedMethod = (method: SavedPaymentMethod) => {
    setSelectedSavedMethod(method.id);
    if (method.payment_type === 'upi') {
      setPaymentMethod('upi');
      setUpiId(method.upi_id || '');
    } else if (method.payment_type === 'card') {
      setPaymentMethod('card');
      setCardDetails({
        number: method.masked_details || '',
        name: method.card_holder_name || '',
        expiry: method.card_expiry || '',
        cvv: ''
      });
    }
  };
 
  
  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId || 'puddle@okhdfcbank');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddChild = async () => {
    const childName = prompt("Enter child's name:");
    if (!childName) return;
    
    const email = prompt("Enter child's email:");
    if (!email) return;
    
    const password = prompt("Enter temporary password:");
    if (!password) return;
    
    const grade = prompt("Enter grade (e.g., Grade 10):");
    if (!grade) return;
    
    const gradeMatch = grade.match(/\d+/);
    const gradeLevel = gradeMatch ? parseInt(gradeMatch[0]) : 0;
    
    const genderOptions = ['male', 'female', 'other'];
    const genderInput = prompt("Select gender (male/female/other):");
    const gender = genderOptions.includes(genderInput?.toLowerCase() || '') 
      ? genderInput?.toLowerCase() 
      : null;
    
    if (!gender) {
      alert('Please select a valid gender (male, female, or other)');
      return;
    }
    
    const school = prompt("Enter school name (optional):") || '';
    const board = prompt("Enter board (e.g., CBSE, ICSE):") || '';
    
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/parent/children', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name: childName, 
          email, 
          password,
          grade,
          gradeLevel,
          school,
          gender,
          board
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Child added successfully!');
        fetchDashboardData();
      } else {
        alert(data.error || 'Failed to add child');
      }
    } catch (error) {
      alert('Error adding child');
    }
  };

  const handleGoToStudentDashboard = (child: Child) => {
    // Only allow navigation if child is active
    if (!child.isActive) {
      setError(`${child.name} is inactive. Please activate the child first.`);
      setTimeout(() => setError(null), 3000);
      return;
    }
    
	localStorage.setItem('studentGrade', child.grade || '');
	  localStorage.setItem('studentGradeLevel', child.gradeLevel.toString());
	  localStorage.setItem('studentBoard', child.board || '');
	  localStorage.setItem('studentBoardId', child.boardId || '');
	  localStorage.setItem('studentId', child.id); // This is the student profile ID
	  localStorage.setItem('studentName', child.name);
	  localStorage.setItem('studentEmail', child.email);
	  localStorage.setItem('isParentAccess', 'true'); // Flag to indicate parent access
	  
	  // Also store the parent's auth token - this is important!
	  // The student dashboard will use the same token to verify access
    router.push('/student-dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


const getSubscriptionStatusBadge = (child: Child) => {
  const hasActiveSubscriptions = child.activeGrades && child.activeGrades.length > 0;
  const hasSubscriptionForCurrentGrade = child.activeGrades?.some(
    g => g.gradeLevel === child.gradeLevel
  );
  const hasFreeTrial = child.subscriptionStatus === 'free_trial';
  
  // No active subscriptions
  if (!hasActiveSubscriptions && !hasFreeTrial) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          openSubscriptionModal(child, false);
        }}
        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-1"
      >
        <CreditCard size={12} />
        Subscribe
      </button>
    );
  }
  
  // Has free trial
  if (hasFreeTrial) {
    const daysLeft = child.freeTrialEndDate 
      ? Math.ceil((new Date(child.freeTrialEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
          Free Trial ({daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` : 'Expired'})
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openSubscriptionModal(child, true);
          }}
          className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full hover:bg-blue-700 transition-colors"
        >
          Subscribe
        </button>
      </div>
    );
  }
  
  // Has active subscription
  if (hasActiveSubscriptions) {
    const hasMultiple = child.activeGrades.length > 1;
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
          {hasMultiple ? `${child.activeGrades.length} Active Grades` : 'Active'}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openSubscriptionModal(child, true);
          }}
          className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full hover:bg-blue-700 transition-colors"
        >
          {hasSubscriptionForCurrentGrade ? 'Renew Current Grade' : 'Subscribe'}
        </button>
      </div>
    );
  }
  
  return null;
};

const getChildActiveGrades = async (childId: string) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`/api/student/subscription-status?studentId=${childId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data.activeGrades || [];
  } catch (error) {
    console.error('Error fetching active grades:', error);
    return [];
  }
};

// Update the child card to show multiple active subscriptions
const getActiveGradesBadge = (activeGrades: any[]) => {
  if (!activeGrades || activeGrades.length === 0) return null;
  
  if (activeGrades.length === 1) {
    return (
      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
        Active: Grade {activeGrades[0].gradeLevel}
      </span>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-1">
      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
        {activeGrades.length} Active Grades
      </span>
      <div className="flex gap-1">
        {activeGrades.map(grade => (
          <span key={grade.gradeLevel} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            Gr {grade.gradeLevel}
          </span>
        ))}
      </div>
    </div>
  );
};

// Update the child display in children tab
{children.map((child) => {
  const activeGrades = child.activeGrades || [];
  const hasMultipleGrades = activeGrades.length > 1;
  
  return (
    <div key={child.id} className="p-6 border-b">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-lg">{child.name}</p>
            {!child.isActive && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Inactive</span>}
            {getSubscriptionStatusBadge(child)}
            {hasMultipleGrades && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                Multi-Grade Access
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{child.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            Current Grade: {child.grade} • Board: {child.board}
          </p>
          
          {/* Show all active subscriptions */}
          {activeGrades.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-600 mb-1">Active Subscriptions:</p>
              <div className="flex flex-wrap gap-2">
                {activeGrades.map(grade => (
                  <div key={grade.gradeLevel} className="text-xs bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
                    <span className="font-medium text-blue-700">Grade {grade.gradeLevel}</span>
                    <span className="text-gray-500 ml-1">
                      (ends: {new Date(grade.endDate).toLocaleDateString()})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 flex-wrap justify-end">
          <button 
            onClick={() => router.push(`/parent-dashboard/children/${child.id}`)} 
            className="px-3 py-1 text-blue-600 border rounded-lg text-sm hover:bg-blue-50"
          >
            Edit
          </button>
          <button 
            onClick={() => handleGoToStudentDashboard(child)} 
            className={`px-3 py-1 border rounded-lg text-sm ${
              child.isActive && activeGrades.length > 0
                ? 'text-green-600 border-green-300 hover:bg-green-50 cursor-pointer' 
                : 'text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
            }`}
            disabled={!child.isActive || activeGrades.length === 0}
            title={!child.isActive ? "Child is inactive" : activeGrades.length === 0 ? "No active subscriptions" : ""}
          >
            Portal
          </button>
          {child.subscriptionStatus === 'active' && (
            <button 
              onClick={() => handleMarkComplete(child.id, child.gradeLevel)} 
              className="px-3 py-1 text-purple-600 border border-purple-300 rounded-lg text-sm hover:bg-purple-50"
            >
              <Award className="inline-block w-3 h-3 mr-1" /> Complete Course
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{child.progress || 0}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className={`h-full rounded-full ${child.isActive ? 'bg-blue-500' : 'bg-gray-400'}`} style={{ width: `${child.progress || 0}%` }} />
        </div>
      </div>
    </div>
  );
})}

// Add this state with your other state declarations
const openSubscriptionModal = (child: Child, isRenewal: boolean = false, gradeLevel?: number) => {
  const grade = gradeLevel || child.gradeLevel;
  setTargetGrade(grade);
  setRenewingGrade(grade);   // ← new state for modal display
  setSelectedChildForSubscription(child);
  setIsRenewal(isRenewal);

  const matchingPlan = subscriptionPlans.find(plan => 
    grade >= plan.grade_range_start && grade <= plan.grade_range_end
  );

  if (matchingPlan) {
    setSelectedPlan(matchingPlan);
    const existingGradeSubscription = child.activeGrades?.find(g => g.gradeLevel === grade);
    if (existingGradeSubscription) {
      setIsRenewal(true);
      setPaymentAmount(subscriptionType === 'monthly' ? matchingPlan.monthly_price.toString() : matchingPlan.yearly_price.toString());
      setPaymentDescription(
        `Renew ${subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'} Subscription for Grade ${grade} - ${child.name}`
      );
    } else {
      setIsRenewal(false);
      setPaymentAmount(subscriptionType === 'monthly' ? matchingPlan.monthly_price.toString() : matchingPlan.yearly_price.toString());
      setPaymentDescription(
        `New ${subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'} Subscription for Grade ${grade} - ${child.name}`
      );
    }
    setSelectedChild(child.id);
  }
  setShowSubscriptionModal(true);
};


// Add state for renewal flag
const [isRenewal, setIsRenewal] = useState(false);
const handleMakePayment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
    setError('Please enter a valid amount');
    return;
  }
  
  setProcessing(true);
  setError(null);
  
  try {
    const token = localStorage.getItem('authToken');
    
    const paymentData: any = {
      amount: parseFloat(paymentAmount),
      childId: selectedChild || undefined,
      description: paymentDescription || 'Course Payment',
      paymentMethod: paymentMethod,
      saveMethod: showSaveMethod,
      upiId: paymentMethod === 'upi' ? upiId : undefined,
      cardDetails: paymentMethod === 'card' ? {
        number: cardDetails.number,
        name: cardDetails.name,
        expiry: cardDetails.expiry
      } : undefined
    };
    
    // Add subscription info if a plan is selected
    if (selectedPlan && selectedChild) {
      const selectedChildData = children.find(c => c.id === selectedChild);
      if (selectedChildData) {
        // Use targetGrade if available, otherwise fallback to child's current grade
        const gradeToUse = targetGrade !== null ? targetGrade : selectedChildData.gradeLevel;
        console.log('Payment - Using grade:', gradeToUse, 'targetGrade:', targetGrade, 'childGrade:', selectedChildData.gradeLevel);
        
        paymentData.planId = selectedPlan.id;
        paymentData.billingCycle = subscriptionType;
        paymentData.gradeLevel = gradeToUse;
        paymentData.isRenewal = isRenewal;
      }
    }
    
    console.log('Sending payment data:', paymentData);
    
    const response = await fetch('/api/parent/payments', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    });
    
    const data = await response.json();
    console.log('Payment response:', data);
    
    if (response.ok && data.success) {
      setPaymentSuccess(true);
      setShowSaveMethod(false);
      setUpiId('');
      setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
      setPaymentAmount('');
      setSelectedChild('');
      setPaymentDescription('');
      setSelectedSavedMethod(null);
      setSelectedPlan(null);
      setSelectedChildForSubscription(null);
      setIsRenewal(false);
      setTargetGrade(null);  // ← clear target grade after successful payment
	  setRenewingGrade(null);
      
      if (data.message) {
        setSaveSuccess(data.message);
      } else if (data.subscription) {
        const endDate = new Date(data.subscription.end_date);
        const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        setSaveSuccess(`Payment successful! Subscription active for ${daysLeft} days until ${endDate.toLocaleDateString()}`);
      } else {
        setSaveSuccess('Payment successful! Transaction recorded.');
      }
      
      await fetchDashboardData();
      
      setTimeout(() => {
        setPaymentSuccess(false);
        setSaveSuccess(null);
      }, 5000);
    } else {
      throw new Error(data.error || data.message || 'Payment failed');
    }
  } catch (error: any) {
    console.error('Payment error:', error);
    setError(error.message || 'Failed to process payment. Please try again.');
    setTimeout(() => setError(null), 5000);
  } finally {
    setProcessing(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-blue-800">Puddle</Link>
            <div className="flex items-center gap-4">
              <UserProfile userName={parentData?.name} userEmail={parentData?.email} />
              <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Welcome, {parentData?.name?.split(' ')[0] || 'Parent'}!</h1>
          <p className="text-gray-600 mb-8">Manage your children's learning journey</p>

          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{saveSuccess}</p>
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('children')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'children' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Children ({children.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Payments
            </button>
			
			<button
			  onClick={() => setActiveTab('support')}
			  className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'support' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
			>
			  Support
			</button>
			
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Settings
            </button>
          </div>

          {/* Overview Tab - Keep existing */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Children</p>
                      <p className="text-3xl font-bold text-gray-900">{children.length}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Average Progress</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {children.length > 0 
                          ? Math.round(children.reduce((s, c) => s + (c.progress || 0), 0) / children.length)
                          : 0}%
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${children.length > 0 ? Math.round(children.reduce((s, c) => s + (c.progress || 0), 0) / children.length) : 0}%` }} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Active Subscriptions</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {children.filter(c => c.subscriptionStatus === 'active' || c.subscriptionStatus === 'free_trial').length}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Wallet className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Spent</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(payments.reduce((s, p) => s + p.amount, 0))}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <IndianRupee className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Recent Payments</h3>
                    <button onClick={() => setActiveTab('payments')} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="divide-y">
                    {payments.slice(0, 3).length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-sm">No recent payments</div>
                    ) : (
                      payments.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                              <p className="text-xs text-gray-500">{payment.description || 'Course Payment'}</p>
                              {payment.child_name && <p className="text-xs text-blue-600 mt-0.5">For: {payment.child_name}</p>}
                            </div>
                            <div className="text-right">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {payment.status}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{formatDate(payment.payment_date)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5 border-b">
                    <h3 className="font-semibold text-gray-900">Subscription Status</h3>
                  </div>
                  <div className="divide-y">
                    {children.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">No children added yet</div>
                    ) : (
                      children.slice(0, 3).map((child) => (
                        <div key={child.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{child.name}</p>
                              <p className="text-xs text-gray-500">{child.grade} • {child.board}</p>
                              {!child.isActive && (
                                <span className="text-xs text-red-500 mt-1 block">Inactive</span>
                              )}
                            </div>
                            <div className="text-right">
                              {getSubscriptionStatusBadge(child)}
                              {child.subscriptionStatus === 'active' && (
                                <button
                                  onClick={() => handleMarkComplete(child.id, child.gradeLevel)}
                                  className="mt-1 text-xs text-green-600 hover:text-green-700 block"
                                >
                                  Mark as Completed
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setActiveTab('children')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors"><Users className="h-5 w-5 text-blue-600" /></div>
                    <div><p className="font-medium text-gray-900">Manage Children</p><p className="text-xs text-gray-500">Add or edit child profiles</p></div>
                  </div>
                </button>
                <button onClick={() => setActiveTab('payments')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors"><Wallet className="h-5 w-5 text-green-600" /></div>
                    <div><p className="font-medium text-gray-900">Make a Payment</p><p className="text-xs text-gray-500">Subscribe or add funds</p></div>
                  </div>
                </button>
                <button onClick={() => setActiveTab('settings')} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-left group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors"><Settings className="h-5 w-5 text-purple-600" /></div>
                    <div><p className="font-medium text-gray-900">Account Settings</p><p className="text-xs text-gray-500">Update profile preferences</p></div>
                  </div>
                </button>
              </div>
            </div>
          )}
         
		  {/* Children Tab */}
			{activeTab === 'children' && (
			  <div className="bg-white rounded-xl shadow-sm">
				<div className="p-6 border-b flex justify-between items-center">
				  <h2 className="font-semibold text-lg">All Children</h2>
				  <button 
					onClick={handleAddChild} 
					className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
				  >
					<Plus size={16} />
					Add Child
				  </button>
				</div>
				
				{children.length === 0 ? (
				  <div className="p-12 text-center text-gray-500">
					<Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
					<p>No children added yet</p>
					<button onClick={handleAddChild} className="mt-3 text-blue-600 hover:text-blue-700">
					  Add your first child
					</button>
				  </div>
				) : (
				  children.map((child) => {
					const hasActiveSubscriptions = child.activeGrades && child.activeGrades.length > 0;
					const hasSubscriptionForCurrentGrade = child.activeGrades?.some(
					  g => g.gradeLevel === child.gradeLevel
					);
					const isGradeChangedWithoutSubscription = !hasSubscriptionForCurrentGrade && 
					  child.subscriptionStatus !== 'free_trial' && 
					  child.activeGrades && 
					  child.activeGrades.length > 0;
					
					return (
					  <div key={child.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
						<div className="flex justify-between items-start">
						  <div className="flex-1">
							{/* Child Name and Status Badges */}
							<div className="flex items-center gap-2 flex-wrap mb-2">
							  <p className="font-semibold text-lg text-gray-900">{child.name}</p>
							  {!child.isActive && (
								<span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
								  Inactive
								</span>
							  )}
							  {getSubscriptionStatusBadge(child)}
							  {hasActiveSubscriptions && child.activeGrades.length > 1 && (
								<span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
								  {/* child.activeGrades.length */} 
								  Multiple Grades
								</span>
							  )}
							</div>
							
							{/* Child Details */}
							<p className="text-sm text-gray-500 mb-1">{child.email}</p>
							<p className="text-xs text-gray-400 mb-2">
							  Current Grade: {child.grade} • Board: {child.board}
							</p>
							
							{/* Warning: Grade changed without subscription */}
							{isGradeChangedWithoutSubscription && (
							  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
								<div className="flex items-start gap-2">
								  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
								  <div className="flex-1">
									<p className="text-xs text-yellow-800 font-medium">
									  Grade changed to {child.grade} - No active subscription
									</p>
									<p className="text-xs text-yellow-700 mt-1">
									  Your child needs a subscription to access {child.grade} courses.
									</p>
									<button
									  onClick={() => openSubscriptionModal(child, false, child.gradeLevel)}
									  className="mt-2 text-xs bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition-colors"
									>
									  Enroll in {child.grade} Now
									</button>
								  </div>
								</div>
							  </div>
							)}
							
							{/* Active Subscriptions Display */}
							{hasActiveSubscriptions && (
							  <div className="mt-3">
								<p className="text-xs font-medium text-gray-600 mb-2">Active Subscriptions:</p>
								<div className="space-y-2">
								  {child.activeGrades
									.filter((grade, index, self) => 
									  index === self.findIndex(g => g.gradeLevel === grade.gradeLevel)
									)
									.map((grade) => {
									  const endDate = new Date(grade.endDate);
									  const now = new Date();
									  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
									  const isValidDate = !isNaN(endDate.getTime());
									  const isForCurrentGrade = grade.gradeLevel === child.gradeLevel;
									  
									  return (
										<div 
										  key={grade.gradeLevel} 
										  className={`flex items-center justify-between rounded-lg p-3 border ${
											isForCurrentGrade 
											  ? 'bg-green-50 border-green-200' 
											  : 'bg-blue-50 border-blue-200'
										  }`}
										>
										  <div className="flex items-center gap-3">
											<GraduationCap className={`h-4 w-4 ${isForCurrentGrade ? 'text-green-600' : 'text-blue-600'}`} />
											<div>
											  <p className="text-sm font-medium text-gray-900">
												Grade {grade.gradeLevel} {grade.billingCycle === 'free_trial' ? 'Free Trial' : 'Subscription'}
												{isForCurrentGrade && (
												  <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
													Current
												  </span>
												)}
											  </p>
											  {isValidDate && (
												<p className="text-xs text-gray-600 mt-0.5">
												  {grade.billingCycle === 'free_trial' ? 'Trial ends' : 'Subscription ends'}: {formatDate(grade.endDate)}
												</p>
											  )}
											</div>
										  </div>
										  <div className="flex items-center gap-2">
											{isValidDate && daysLeft > 0 ? (
											  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
												isForCurrentGrade 
												  ? 'bg-green-100 text-green-700' 
												  : 'bg-blue-100 text-blue-700'
											  }`}>
												{daysLeft} day{daysLeft !== 1 ? 's' : ''} left
											  </span>
											) : (
											  <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded-full">
												Expired
											  </span>
											)}
											<button
											  onClick={() => openSubscriptionModal(child, true, grade.gradeLevel)}
											  className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full hover:bg-blue-700 transition-colors"
											>
											  Renew
											</button>
										  </div>
										</div>
									  );
									})}
								</div>
							  </div>
							)}
							
							{/* No Active Subscriptions Message */}
							{!hasActiveSubscriptions && child.subscriptionStatus !== 'free_trial' && (
							  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
								<p className="text-xs text-gray-500">
								  No active subscriptions. Click "Subscribe" to enroll in a course.
								</p>
							  </div>
							)}
							
							{/* Free Trial Active Message */}
							{child.subscriptionStatus === 'free_trial' && child.freeTrialEndDate && (
							  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
								<div className="flex items-start gap-2">
								  <Gift className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
								  <div>
									<p className="text-xs text-green-800 font-medium">
									  Free Trial Active
									</p>
									<p className="text-xs text-green-700 mt-1">
									  Trial ends: {formatDate(child.freeTrialEndDate)}
									</p>
								  </div>
								</div>
							  </div>
							)}
						  </div>
						  
						  {/* Action Buttons */}
						  <div className="flex gap-2 flex-wrap justify-end ml-4">
							<button 
							  onClick={() => router.push(`/parent-dashboard/children/${child.id}`)} 
							  className="px-3 py-1.5 text-blue-600 border border-blue-300 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center gap-1"
							>
							  <Edit size={14} />
							  Edit
							</button>
							
							<button 
							  onClick={() => handleGoToStudentDashboard(child)} 
							  className={`px-3 py-1.5 border rounded-lg text-sm flex items-center gap-1 transition-colors ${
								child.isActive && hasSubscriptionForCurrentGrade
								  ? 'text-green-600 border-green-300 hover:bg-green-50 cursor-pointer' 
								  : 'text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
							  }`}
							  disabled={!child.isActive || !hasSubscriptionForCurrentGrade}
							  title={
								!child.isActive 
								  ? "Child is inactive" 
								  : !hasSubscriptionForCurrentGrade 
									? "No active subscription for current grade" 
									: ""
							  }
							>
							  <ExternalLink size={14} />
							  Portal
							</button>
							
							{hasSubscriptionForCurrentGrade && (
							  <button 
								onClick={() => handleMarkComplete(child.id, child.gradeLevel)} 
								className="px-3 py-1.5 text-purple-600 border border-purple-300 rounded-lg text-sm hover:bg-purple-50 transition-colors flex items-center gap-1"
							  >
								<Award size={14} />
								Complete
							  </button>
							)}
							
							{child.gradeLevel < 12 && (
							  <button
								onClick={() => {
								  setSelectedChildForGradeChange(child);
								  setShowGradeChangeModal(true);
								}}
								className="px-3 py-1.5 text-orange-600 border border-orange-300 rounded-lg text-sm hover:bg-orange-50 transition-colors flex items-center gap-1"
							  >
								<GraduationCap size={14} />
								Upgrade Grade
							  </button>
							)}
						  </div>
						</div>
						
						{/* Progress Bar */}
						<div className="mt-4">
						  <div className="flex justify-between text-sm mb-1">
							<span className="text-gray-600">Overall Progress</span>
							<span className="font-medium text-gray-900">{child.progress || 0}%</span>
						  </div>
						  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
							<div 
							  className={`h-full rounded-full transition-all duration-500 ${
								child.isActive && hasSubscriptionForCurrentGrade ? 'bg-blue-500' : 'bg-gray-400'
							  }`} 
							  style={{ width: `${child.progress || 0}%` }} 
							/>
						  </div>
						</div>
					  </div>
					);
				  })
				)}
			  </div>
			)}


			{/* Payments Tab */}
			{activeTab === 'payments' && (
			<div className="grid lg:grid-cols-2 gap-8">
			{/* Left Column: Payment Methods & Form */}
			<div id="payment-form" className="bg-white rounded-xl shadow-sm p-6">
			  <h2 className="font-semibold mb-4">Payment Methods</h2>

			  {/* List of Saved Payment Methods */}
			  {savedMethods.length > 0 ? (
				<div className="mb-6">
				  <label className="block text-sm font-medium text-gray-700 mb-2">
					Your Payment Methods
				  </label>
				  <div className="space-y-2">
					{savedMethods.map((method) => (
					  <div
						key={method.id}
						onClick={() => handleUseSavedMethod(method)}
						className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
						  selectedSavedMethod === method.id
							? 'border-blue-500 bg-blue-50'
							: method.is_default
							? 'border-green-300 bg-green-50'
							: 'border-gray-200 hover:border-blue-300'
						}`}
					  >
						<div className="flex items-center gap-3">
						  {method.payment_type === 'card' ? (
							<CreditCard size={20} className="text-gray-500" />
						  ) : (
							<Smartphone size={20} className="text-gray-500" />
						  )}
						  <div>
							<p className="font-medium text-gray-900">
							  {method.payment_type === 'card'
								? `${method.card_brand || 'Card'} ending in ${method.card_last4}`
								: method.upi_id}
							</p>
							{method.is_default && (
							  <span className="text-xs text-green-600">Default</span>
							)}
						  </div>
						</div>
						<div className="flex gap-2">
						  {!method.is_default && (
							<button
							  onClick={(e) => {
								e.stopPropagation();
								handleSetDefaultMethod(method.id);
							  }}
							  className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded"
							>
							  Set as Default
							</button>
						  )}
						  <button
							onClick={(e) => {
							  e.stopPropagation();
							  handleDeleteMethod(method.id);
							}}
							className="text-xs text-red-500 hover:text-red-600 px-2 py-1 rounded"
						  >
							Remove
						  </button>
						</div>
					  </div>
					))}
				  </div>
				</div>
			  ) : (
				<div className="mb-6 p-3 bg-gray-50 rounded-lg text-center text-gray-500">
				  No saved payment methods. Add one below.
				</div>
			  )}

			  {/* Add New Payment Method Button */}
			  <div className="mb-6">
				<button
				  onClick={() => setShowAddPaymentMethodForm(!showAddPaymentMethodForm)}
				  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
				>
				  <Plus size={14} />
				  {showAddPaymentMethodForm ? 'Cancel' : 'Add New Payment Method'}
				</button>
			  </div>

			  {/* Add Payment Method Form */}
			  {showAddPaymentMethodForm && (
				<div className="mb-6 p-4 border rounded-lg bg-gray-50">
				  <h3 className="font-medium text-gray-900 mb-3">Add New Payment Method</h3>
				  <div className="flex gap-2 mb-4 border-b pb-2">
					<button
					  onClick={() => setPaymentMethod('card')}
					  className={`px-4 py-2 rounded-lg transition-all ${
						paymentMethod === 'card'
						  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
						  : 'text-gray-500 hover:text-gray-700'
					  }`}
					>
					  <CreditCard size={16} className="inline mr-1" /> Card
					</button>
					<button
					  onClick={() => setPaymentMethod('upi')}
					  className={`px-4 py-2 rounded-lg transition-all ${
						paymentMethod === 'upi'
						  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
						  : 'text-gray-500 hover:text-gray-700'
					  }`}
					>
					  <Smartphone size={16} className="inline mr-1" /> UPI
					</button>
				  </div>

				  {paymentMethod === 'card' && (
					<div className="space-y-3">
					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
						<input
						  type="text"
						  value={cardDetails.number}
						  onChange={(e) => {
							let value = e.target.value.replace(/\s/g, '');
							if (value.length > 16) value = value.slice(0, 16);
							const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
							setCardDetails({ ...cardDetails, number: formatted });
						  }}
						  placeholder="1234 5678 9012 3456"
						  maxLength={19}
						  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
						/>
					  </div>
					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
						<input
						  type="text"
						  value={cardDetails.name}
						  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
						  placeholder="NAME ON CARD"
						  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 uppercase"
						/>
					  </div>
					  <div className="grid grid-cols-2 gap-3">
						<div>
						  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
						  <input
							type="text"
							value={cardDetails.expiry}
							onChange={(e) => {
							  let value = e.target.value.replace(/\D/g, '');
							  if (value.length >= 2) {
								value = value.slice(0, 2) + '/' + value.slice(2, 4);
							  }
							  setCardDetails({ ...cardDetails, expiry: value });
							}}
							placeholder="MM/YY"
							maxLength={5}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
						  />
						</div>
						<div>
						  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
						  <input
							type="password"
							value={cardDetails.cvv}
							onChange={(e) => {
							  let value = e.target.value.replace(/\D/g, '');
							  if (value.length > 3) value = value.slice(0, 3);
							  setCardDetails({ ...cardDetails, cvv: value });
							}}
							placeholder="123"
							maxLength={3}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
						  />
						</div>
					  </div>
					</div>
				  )}

				  {paymentMethod === 'upi' && (
					<div className="space-y-3">
					  <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
						<input
						  type="text"
						  value={upiId}
						  onChange={(e) => setUpiId(e.target.value)}
						  placeholder="e.g., username@okhdfcbank"
						  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
						/>
					  </div>
					</div>
				  )}

				  <div className="mt-4 flex justify-end gap-3">
					<button
					  onClick={() => {
						setShowAddPaymentMethodForm(false);
						setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
						setUpiId('');
					  }}
					  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
					>
					  Cancel
					</button>
					<button
					  onClick={async () => {
						const token = localStorage.getItem('authToken');
						const payload: any = {
						  paymentMethod,
						};
						if (paymentMethod === 'card') {
						  payload.cardDetails = {
							number: cardDetails.number,
							name: cardDetails.name,
							expiry: cardDetails.expiry,
						  };
						} else {
						  payload.upiId = upiId;
						}

						const res = await fetch('/api/parent/save-payment-method', {
						  method: 'POST',
						  headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						  },
						  body: JSON.stringify(payload),
						});
						const data = await res.json();
						if (res.ok) {
						  setSaveSuccess('Payment method added successfully!');
						  setShowAddPaymentMethodForm(false);
						  setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
						  setUpiId('');
						  await fetchDashboardData(); // refresh savedMethods
						} else {
						  setError(data.error || 'Failed to save payment method');
						}
					  }}
					  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
					  Save Method
					</button>
				  </div>
				</div>
			  )}

			  {/* Make a Payment Section (only shown when a plan/child is selected) */}
			  {selectedChildForSubscription && (
				<div className="mt-6 pt-6 border-t">
				  <h2 className="font-semibold mb-4">Make a Payment</h2>
				  {paymentSuccess && (
					<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
					  Payment successful! Transaction recorded.
					</div>
				  )}

				  {selectedChildForSubscription && (
					<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
					  <p className="text-sm text-blue-700">
						<strong>Selected Child:</strong> {selectedChildForSubscription.name} ({selectedChildForSubscription.grade})
					  </p>
					</div>
				  )}

				  {/* Subscription Plans */}
				  {subscriptionPlans.length > 0 && (
					<div className="mb-6">
					  <label className="block text-sm font-medium text-gray-700 mb-2">
						Select Subscription Plan for {selectedChildForSubscription.name}
					  </label>
					  <div className="grid grid-cols-1 gap-3">
						{subscriptionPlans
						  .filter(plan => 
							(targetGrade || selectedChildForSubscription.gradeLevel) >= plan.grade_range_start && 
							(targetGrade || selectedChildForSubscription.gradeLevel) <= plan.grade_range_end
						  )
						  .map((plan) => {
							const monthlyPrice = plan.monthly_price;
							const yearlyPrice = plan.yearly_price;
							const yearlyDiscount = ((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12) * 100).toFixed(0);
							const isSelected = selectedPlan?.id === plan.id;
							const isYearlyRecommended = yearlyDiscount >= 15;
							
							return (
							  <div 
								key={plan.id} 
								onClick={() => { 
								  setSelectedPlan(plan); 
								  setSubscriptionType('monthly');
								  setPaymentAmount(monthlyPrice.toString()); 
								  setPaymentDescription(`${plan.description || `Grade ${plan.grade_range_start}-${plan.grade_range_end}`} - Monthly ${isRenewal ? 'Renewal' : 'Subscription'} for ${selectedChildForSubscription.name}`);
								}} 
								className={`p-4 border rounded-lg cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
							  >
								<div className="flex justify-between items-start">
								  <div>
									<h4 className="font-semibold text-gray-900">Grade {plan.grade_range_start} - {plan.grade_range_end}</h4>
									<p className="text-sm text-gray-500 mt-1">{plan.description || 'Complete curriculum for this grade range'}</p>
								  </div>
								  <div className="text-right">
									<div className="flex gap-2">
									  <button 
										onClick={(e) => { 
										  e.stopPropagation(); 
										  setSubscriptionType('monthly'); 
										  setPaymentAmount(monthlyPrice.toString()); 
										  setPaymentDescription(`${plan.description || `Grade ${plan.grade_range_start}-${plan.grade_range_end}`} - Monthly ${isRenewal ? 'Renewal' : 'Subscription'} for ${selectedChildForSubscription.name}`);
										}} 
										className={`px-3 py-1 text-sm rounded-lg ${subscriptionType === 'monthly' && isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
									  >
										Monthly: ₹{monthlyPrice}
									  </button>
									  <div className="relative">
										<button 
										  onClick={(e) => { 
											e.stopPropagation(); 
											setSubscriptionType('yearly'); 
											setPaymentAmount(yearlyPrice.toString()); 
											setPaymentDescription(`${plan.description || `Grade ${plan.grade_range_start}-${plan.grade_range_end}`} - Yearly ${isRenewal ? 'Renewal' : 'Subscription'} for ${selectedChildForSubscription.name}`);
										  }} 
										  className={`px-3 py-1 text-sm rounded-lg ${subscriptionType === 'yearly' && isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
										>
										  Yearly: ₹{yearlyPrice}
										  <span className="ml-1 text-xs text-green-600">({yearlyDiscount}% off)</span>
										</button>
										{isYearlyRecommended && !isRenewal && (
										  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
											Save ₹{(monthlyPrice * 12 - yearlyPrice).toLocaleString()}
										  </span>
										)}
									  </div>
									</div>
									{isYearlyRecommended && !isRenewal && (
									  <p className="text-xs text-green-600 mt-2">
										💡 Recommended: Save {yearlyDiscount}% with yearly plan!
									  </p>
									)}
								  </div>
								</div>
							  </div>
							);
						  })}
					  </div>
					</div>
				  )}

				  {/* Selected Plan Summary (no amount field) */}
				  {selectedPlan && (
					<div className="mb-4 p-3 bg-gray-50 rounded-lg">
					  <div className="flex justify-between">
						<span className="text-gray-600">Selected Plan:</span>
						<span className="font-medium text-gray-900">
						  {subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'} Subscription
						</span>
					  </div>
					  <div className="flex justify-between mt-1">
						<span className="text-gray-600">Amount:</span>
						<span className="font-semibold text-blue-600">
						  {formatCurrency(parseFloat(paymentAmount))}
						</span>
					  </div>
					</div>
				  )}

				  {/* Payment Method Selection */}
				  {savedMethods.length > 0 && (
					<div>
					  <label className="block text-sm font-medium text-gray-700 mb-2">Pay with</label>
					  <div className="space-y-2">
						{savedMethods.map((method) => (
						  <div
							key={method.id}
							onClick={() => handleUseSavedMethod(method)}
							className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
							  selectedSavedMethod === method.id
								? 'border-blue-500 bg-blue-50'
								: method.is_default
								? 'border-green-300 bg-green-50'
								: 'border-gray-200 hover:border-blue-300'
							}`}
						  >
							<div className="flex items-center gap-3">
							  {method.payment_type === 'card' ? (
								<CreditCard size={20} className="text-gray-500" />
							  ) : (
								<Smartphone size={20} className="text-gray-500" />
							  )}
							  <div>
								<p className="font-medium text-gray-900">
								  {method.payment_type === 'card'
									? `${method.card_brand || 'Card'} ending in ${method.card_last4}`
									: method.upi_id}
								</p>
								{method.is_default && (
								  <span className="text-xs text-green-600">Default</span>
								)}
							  </div>
							</div>
							{selectedSavedMethod === method.id && (
							  <CheckCircle size={18} className="text-green-600" />
							)}
						  </div>
						))}
					  </div>
					</div>
				  )}

				  {/* Pay Button */}
				  <button
					onClick={handleMakePayment}
					disabled={processing || !selectedPlan || !selectedSavedMethod}
					className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
				  >
					{processing ? (
					  <>
						<RefreshCw className="h-4 w-4 animate-spin" />
						Processing...
					  </>
					) : (
					  <>
						<CreditCard className="h-4 w-4" />
						Pay {paymentAmount ? formatCurrency(parseFloat(paymentAmount)) : ''}
					  </>
					)}
				  </button>
				</div>
			  )}
			</div>

			{/* Right Column: Payment History (unchanged) */}
			<div className="bg-white rounded-xl shadow-sm">
			  <div className="p-6 border-b">
				<div className="flex justify-between items-center">
				  <h2 className="font-semibold flex items-center gap-2">
					<History className="h-5 w-5 text-gray-500" />
					Payment History
				  </h2>
				  <div className="flex gap-2">
					<button onClick={exportPayments} className="text-sm text-blue-600 border rounded-lg px-3 py-1 hover:bg-blue-50">
					  <Download size={14} className="inline mr-1" /> Export
					</button>
					<button onClick={printPayments} className="text-sm text-gray-600 border rounded-lg px-3 py-1 hover:bg-gray-50">
					  <Printer size={14} className="inline mr-1" /> Print
					</button>
				  </div>
				</div>
			  </div>
			  <div className="divide-y max-h-[500px] overflow-y-auto" id="payment-history-content">
				{payments.length === 0 ? (
				  <div className="p-8 text-center text-gray-500">No payment history found.</div>
				) : (
				  payments.map((payment) => (
					<div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
					  <div className="flex items-center justify-between">
						<div>
						  <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
						  <p className="text-sm text-gray-500">{payment.description || 'Course Payment'}</p>
						  {payment.child_name && (
							<p className="text-xs text-blue-600 mt-0.5 flex items-center gap-1">
							  <Users size={10} />
							  For: {payment.child_name}
							</p>
						  )}
						  {payment.payment_method && (
							<p className="text-xs text-gray-400 mt-0.5">
							  Paid via: {payment.payment_method === 'card' ? 'Card' : payment.payment_method === 'upi' ? 'UPI' : payment.payment_method}
							</p>
						  )}
						</div>
						<div className="text-right">
						  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
							payment.status === 'completed' ? 'bg-green-100 text-green-700' :
							payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
							'bg-red-100 text-red-700'
						  }`}>
							{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
						  </span>
						  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
							<Calendar size={10} />
							{formatDate(payment.payment_date)}
						  </p>
						  {payment.transaction_id && (
							<p className="text-xs text-gray-400 mt-0.5">ID: {payment.transaction_id.slice(0, 12)}...</p>
						  )}
						</div>
					  </div>
					</div>
				  ))
				)}
			  </div>
			  {payments.length > 0 && (
				<div className="p-4 border-t bg-gray-50">
				  <div className="flex justify-between text-sm">
					<span className="text-gray-600">Total Payments</span>
					<span className="font-semibold text-gray-900">{payments.length}</span>
				  </div>
				  <div className="flex justify-between text-sm mt-1">
					<span className="text-gray-600">Total Amount</span>
					<span className="font-semibold text-gray-900">
					  {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
					</span>
				  </div>
				</div>
			  )}
			</div>
			</div>
			)}

			{/* Support Tab */}
			{activeTab === 'support' && (
			  <div className="bg-white rounded-xl shadow-sm p-6">
				<div className="flex justify-between items-center mb-6">
				  <h2 className="font-semibold text-lg">Support Tickets</h2>
				  <button
					onClick={() => setShowTicketModal(true)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
				  >
					+ New Ticket
				  </button>
				</div>

				{supportTickets.length === 0 ? (
				  <div className="text-center py-12 text-gray-500">
					<HelpCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
					<p>No support tickets yet. Create one to get help.</p>
				  </div>
				) : (
				  <div className="space-y-4">
					{supportTickets.map((ticket) => (
					  <div
						key={ticket.id}
						onClick={() => fetchTicketDetails(ticket.id)}
						className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-all"
					  >
						<div className="flex justify-between items-start">
						  <div className="flex-1">
							<div className="flex items-center gap-2 flex-wrap">
							  <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
							  <span className={`text-xs px-2 py-0.5 rounded-full ${
								ticket.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
								ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
								ticket.status === 'resolved' ? 'bg-green-100 text-green-700' :
								'bg-gray-100 text-gray-700'
							  }`}>
								{ticket.status.toUpperCase()}
							  </span>
							  <span className={`text-xs px-2 py-0.5 rounded-full ${
								ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
								ticket.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
								'bg-gray-100 text-gray-700'
							  }`}>
								{ticket.priority}
							  </span>
							</div>
							<p className="text-sm text-gray-500 mt-1 line-clamp-2">{ticket.description}</p>
							{ticket.student_profiles?.name && (
							  <p className="text-xs text-gray-400 mt-1">For: {ticket.student_profiles.name}</p>
							)}
							<p className="text-xs text-gray-400 mt-2">
							  Created: {new Date(ticket.created_at).toLocaleDateString()}
							</p>
							{ticket.admin_response && (
							  <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
								<span className="font-medium">Admin Response:</span> {ticket.admin_response}
							  </div>
							)}
						  </div>
						  <ChevronRight className="h-5 w-5 text-gray-400" />
						</div>
					  </div>
					))}
				  </div>
				)}

				{/* New Ticket Modal */}
				{showTicketModal && (
				  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl max-w-lg w-full p-6">
					  <h3 className="text-xl font-bold mb-4">Create New Support Ticket</h3>
					  <div className="space-y-4">
						<div>
						  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
						  <input
							type="text"
							value={newTicketSubject}
							onChange={(e) => setNewTicketSubject(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							placeholder="Brief summary of your issue"
						  />
						</div>
						<div>
						  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						  <textarea
							value={newTicketDesc}
							onChange={(e) => setNewTicketDesc(e.target.value)}
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							placeholder="Please provide details about your concern..."
						  />
						</div>
						<div>
						  <label className="block text-sm font-medium text-gray-700 mb-1">Related Child (Optional)</label>
						  <select
							value={newTicketStudentId}
							onChange={(e) => setNewTicketStudentId(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
						  >
							<option value="">Not related to a specific child</option>
							{children.map((child) => (
							  <option key={child.id} value={child.id}>{child.name}</option>
							))}
						  </select>
						</div>
						<div>
						  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
						  <select
							value={newTicketPriority}
							onChange={(e) => setNewTicketPriority(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
						  >
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						  </select>
						</div>
					  </div>
					  <div className="mt-6 flex justify-end gap-3">
						<button
						  onClick={() => setShowTicketModal(false)}
						  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
						>
						  Cancel
						</button>
						<button
						  onClick={createTicket}
						  disabled={submitting}
						  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
						>
						  {submitting ? 'Creating...' : 'Create Ticket'}
						</button>
					  </div>
					</div>
				  </div>
				)}

				{/* Ticket Details Modal */}
				{selectedTicket && (
				  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
					  <div className="flex justify-between items-start mb-4">
						<div>
						  <h3 className="text-xl font-bold">{selectedTicket.subject}</h3>
						  <div className="flex gap-2 mt-1">
							<span className={`text-xs px-2 py-0.5 rounded-full ${
							  selectedTicket.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
							  selectedTicket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
							  selectedTicket.status === 'resolved' ? 'bg-green-100 text-green-700' :
							  'bg-gray-100 text-gray-700'
							}`}>
							  {selectedTicket.status.toUpperCase()}
							</span>
							<span className={`text-xs px-2 py-0.5 rounded-full ${
							  selectedTicket.priority === 'high' ? 'bg-red-100 text-red-700' :
							  selectedTicket.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
							  'bg-gray-100 text-gray-700'
							}`}>
							  {selectedTicket.priority}
							</span>
						  </div>
						</div>
						<button
						  onClick={() => setSelectedTicket(null)}
						  className="text-gray-400 hover:text-gray-600"
						>
						  <X size={20} />
						</button>
					  </div>

					  <div className="bg-gray-50 rounded-lg p-4 mb-4">
						<p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
						{selectedTicket.student_profiles?.name && (
						  <p className="text-xs text-gray-500 mt-2">Related Child: {selectedTicket.student_profiles.name}</p>
						)}
						<p className="text-xs text-gray-400 mt-2">Created: {new Date(selectedTicket.created_at).toLocaleString()}</p>
					  </div>

					  {/* Messages */}
					  {ticketMessages.length > 0 && (
						<div className="space-y-3 mb-4">
						  <h4 className="font-medium text-gray-900">Conversation</h4>
						  {ticketMessages.map((msg) => (
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
								  {msg.sender_type === 'admin' ? 'Admin' : 'You'}
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

					  {/* Reply Form */}
					  {selectedTicket.status !== 'closed' && (
						<div className="mt-4">
						  <textarea
							value={replyMessage}
							onChange={(e) => setReplyMessage(e.target.value)}
							rows={3}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							placeholder="Type your reply here..."
						  />
						  <div className="mt-2 flex justify-end">
							<button
							  onClick={addReply}
							  disabled={submitting || !replyMessage.trim()}
							  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
							>
							  {submitting ? 'Sending...' : 'Send Reply'}
							</button>
						  </div>
						</div>
					  )}

					  <div className="mt-4 text-xs text-gray-500">
						Ticket ID: {selectedTicket.id}
					  </div>
					</div>
				  </div>
				)}
			  </div>
			)}
						
						
		  {/* Settings Tab - Keep existing */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b"><h2 className="font-semibold">Account Settings</h2></div>
              <div className="p-6 space-y-6">
                <div><h3 className="font-medium text-gray-900 mb-4">Profile Information</h3><div className="grid md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={settingsForm.name} disabled className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" /><p className="text-xs text-gray-400 mt-1">Name cannot be changed. Please contact support if you need to update your name.</p></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={settingsForm.email} disabled className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" /><p className="text-xs text-gray-400 mt-1">Email cannot be changed. Please contact support if you need to update your email.</p></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" value={settingsForm.phone} onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})} placeholder="Enter phone number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><textarea value={settingsForm.address} onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})} rows={2} placeholder="Enter your address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></div></div></div>
                <div className="border-t pt-6"><h3 className="font-medium text-gray-900 mb-4">Notification Preferences</h3><div className="space-y-3"><label className="flex items-center cursor-pointer"><input type="checkbox" checked={settingsForm.emailNotifications} onChange={(e) => setSettingsForm({...settingsForm, emailNotifications: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-gray-700">Email notifications for child progress</span></label><label className="flex items-center cursor-pointer"><input type="checkbox" checked={settingsForm.paymentReminders} onChange={(e) => setSettingsForm({...settingsForm, paymentReminders: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-gray-700">Payment reminders</span></label><label className="flex items-center cursor-pointer"><input type="checkbox" checked={settingsForm.weeklyReports} onChange={(e) => setSettingsForm({...settingsForm, weeklyReports: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /><span className="ml-2 text-gray-700">Weekly progress reports</span></label></div></div>
                <div className="border-t pt-6 flex justify-end"><button onClick={handleSaveSettings} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">{saving ? 'Saving...' : 'Save Changes'}</button></div>
              </div>
            </div>
          )}
        </div>
      </div>

     
		{/* Subscription Modal */}
		{showSubscriptionModal && selectedChildForSubscription && (
		  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
			  <div className="text-center mb-6">
				<CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-3" />
				<h2 className="text-2xl font-bold text-gray-900">
				  {isRenewal ? `Renew Subscription for ${selectedChildForSubscription.name}` : `Subscribe for ${selectedChildForSubscription.name}`}
				</h2>
				<p className="text-gray-600 mt-2">Grade {renewingGrade ?? selectedChildForSubscription?.grade}</p>
			  </div>
			  
			  <div className="bg-gray-50 rounded-lg p-4 mb-6">
				{/* Check if there's an existing subscription for this grade */}
				{(() => {
				  const existingSubscription = selectedChildForSubscription.activeGrades?.find(
					g => g.gradeLevel === selectedChildForSubscription.gradeLevel
				  );
				  
				  if (existingSubscription && isRenewal) {
					const currentEndDate = new Date(existingSubscription.endDate);
					const daysLeft = Math.ceil((currentEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
					
					return (
					  <div className="mb-3 pb-3 border-b border-gray-200">
						<div className="flex justify-between">
						  <span className="text-gray-600">Current Subscription Ends:</span>
						  <span className="font-semibold text-orange-600">
							{formatDate(existingSubscription.endDate)}
						  </span>
						</div>
						<div className="flex justify-between mt-1">
						  <span className="text-gray-600">Days Remaining:</span>
						  <span className="font-semibold text-blue-600">
							{daysLeft > 0 ? `${daysLeft} days` : 'Expired'}
						  </span>
						</div>
					  </div>
					);
				  }
				  return null;
				})()}
				
				<div className="flex justify-between mb-2">
				  <span className="text-gray-600">Selected Plan:</span>
				  <span className="font-semibold text-gray-900">
					{subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'} {isRenewal ? 'Renewal' : 'Subscription'}
				  </span>
				</div>
				
				{selectedPlan && (
				  <div className="flex justify-between mb-2">
					<span className="text-gray-600">Price:</span>
					<span className="font-semibold text-blue-600">
					  {formatCurrency(subscriptionType === 'monthly' ? selectedPlan.monthly_price : selectedPlan.yearly_price)}/{subscriptionType === 'monthly' ? 'month' : 'year'}
					</span>
				  </div>
				)}
				
				<div className="flex justify-between">
				  <span className="text-gray-600">Will Add:</span>
				  <span className="text-gray-900">
					{subscriptionType === 'monthly' ? '30 days of access' : '365 days of access'}
				  </span>
				</div>
				
				{isRenewal && (
				  <div className="mt-3 pt-3 border-t border-gray-200">
					<div className="flex justify-between">
					  <span className="text-gray-600">New End Date:</span>
					  <span className="font-semibold text-green-600">
						{(() => {
						  const existingSubscription = selectedChildForSubscription.activeGrades?.find(
							g => g.gradeLevel === selectedChildForSubscription.gradeLevel
						  );
						  
						  if (existingSubscription) {
							const currentEndDate = new Date(existingSubscription.endDate);
							const now = new Date();
							const startFrom = currentEndDate > now ? currentEndDate : now;
							const newEndDate = new Date(startFrom);
							
							if (subscriptionType === 'monthly') {
							  newEndDate.setDate(newEndDate.getDate() + 30);
							} else {
							  newEndDate.setFullYear(newEndDate.getFullYear() + 1);
							}
							
							return formatDate(newEndDate.toISOString());
						  }
						  return 'Calculating...';
						})()}
					  </span>
					</div>
				  </div>
				)}
			  </div>

			  <div className="space-y-3 mb-6">
				<div className="flex items-start gap-3">
				  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
				  <span className="text-sm text-gray-700">Full access to all Grade {selectedChildForSubscription.grade} subjects</span>
				</div>
				<div className="flex items-start gap-3">
				  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
				  <span className="text-sm text-gray-700">Interactive video lessons and quizzes</span>
				</div>
				<div className="flex items-start gap-3">
				  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
				  <span className="text-sm text-gray-700">Progress tracking and performance analytics</span>
				</div>
			  </div>

			  <div className="flex gap-3">
				<button
				  onClick={handleSubscribe}
				  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
				>
				  {isRenewal ? `Renew for ${subscriptionType === 'monthly' ? '30 Days' : '1 Year'}` : 'Proceed to Payment'}
				</button>
				<button
				  onClick={() => {
					setShowSubscriptionModal(false);
					setSelectedChildForSubscription(null);
					setIsRenewal(false);
				  }}
				  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
				>
				  Cancel
				</button>
			  </div>
			</div>
		  </div>
		)}

	 
      {/* Grade Change Modal */}
      {showGradeChangeModal && selectedChildForGradeChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="text-center mb-6">
              <GraduationCap className="h-12 w-12 text-orange-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900">Request Grade Upgrade</h2>
              <p className="text-gray-600 mt-2">Request to upgrade {selectedChildForGradeChange.name} to Grade {selectedChildForGradeChange.gradeLevel + 1}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for upgrade (optional)</label>
              <textarea value={gradeChangeReason} onChange={(e) => setGradeChangeReason(e.target.value)} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Completed all courses, moving to next grade..." />
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-xs text-yellow-800">Note: This request will be reviewed by support. You will be notified once approved.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleGradeChangeRequest} disabled={enrollmentLoading} className="flex-1 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 font-medium">{enrollmentLoading ? 'Submitting...' : 'Submit Request'}</button>
              <button onClick={() => { setShowGradeChangeModal(false); setSelectedChildForGradeChange(null); setGradeChangeReason(''); }} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}