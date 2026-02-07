"use client"

import Link from 'next/link';
import { 
  Home,
  Users,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  Plus,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  RefreshCw,
  BookOpen,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [children, setChildren] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [parentData, setParentData] = useState<any>(null);
  const [stats, setStats] = useState({
    totalChildren: 0,
    monthlyCost: 0,
    avgProgress: 0,
    activeCourses: 0
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch parent's children
      const childrenRes = await fetch('/api/parent/children');
      if (childrenRes.ok) {
        const childrenData = await childrenRes.json();
        setChildren(childrenData.children || []);
        setStats(prev => ({ ...prev, totalChildren: childrenData.children?.length || 0 }));
      } else {
        const errorData = await childrenRes.json();
        throw new Error(errorData.error || 'Failed to fetch children');
      }

      // Fetch payments
      const paymentsRes = await fetch('/api/parent/payments?limit=5');
      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPayments(paymentsData.payments || []);
        
        // Calculate monthly cost
        const monthlyCost = paymentsData.payments
          ?.filter((p: any) => p.status === 'completed')
          .reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
        setStats(prev => ({ ...prev, monthlyCost }));
      }

      // Fetch parent profile
      const profileRes = await fetch('/api/parent/profile');
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setParentData(profileData);
      }

      // Fetch progress data
      const progressRes = await fetch('/api/parent/children/progress');
      if (progressRes.ok) {
        const progressData = await progressRes.json();
        const avgProgress = progressData.children?.length > 0 
          ? progressData.children.reduce((sum: number, child: any) => sum + (child.progress || 0), 0) / progressData.children.length
          : 0;
        setStats(prev => ({ ...prev, avgProgress: Math.round(avgProgress) }));
        
        const activeCourses = progressData.children?.reduce((sum: number, child: any) => 
          sum + (child.activeCourses || 0), 0) || 0;
        setStats(prev => ({ ...prev, activeCourses }));
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message || 'Failed to load dashboard data');
      
      // If unauthorized, redirect to login
      if (error.message.includes('Unauthorized') || error.message.includes('Forbidden')) {
        setTimeout(() => router.push('/login'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddChild = async () => {
    const childName = prompt("Enter child's name:");
    if (!childName) return;
    
    const grade = prompt("Enter child's grade:");
    if (!grade) return;
    
    const email = prompt("Enter child's email (for login):");
    if (!email) return;
    
    const password = prompt("Enter temporary password for child:");
    if (!password) return;

    try {
      const response = await fetch('/api/parent/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: childName, 
          grade,
          email,
          password
        })
      });
      
      if (response.ok) {
        alert('Child added successfully! They can now login with the provided credentials.');
        fetchDashboardData();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add child');
      }
    } catch (error) {
      console.error('Error adding child:', error);
      alert('Error adding child');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={handleLogout}
              className="ml-4 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <span className="text-2xl font-bold text-blue-800 font-serif">Puddle Parent</span>
              </Link>
              <div className="hidden md:block text-sm text-blue-600 italic">
                {parentData ? `Welcome back, ${parentData.user?.name}` : 'Monitoring your child\'s progress'}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button 
                onClick={fetchDashboardData}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Refresh"
              >
                <RefreshCw size={20} />
              </button>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {parentData?.user?.name?.charAt(0).toUpperCase() || 'P'}
                  </span>
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {parentData?.user?.name || 'Parent Account'}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-4 text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Home */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium group transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 mt-2">
              Here's an overview of your children's progress and payments.
              {parentData?.user?.email && ` Logged in as ${parentData.user.email}`}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('children')}
              className={`px-6 py-3 font-medium ${activeTab === 'children' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              My Children ({children.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 font-medium ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Payments ({payments.filter(p => p.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Children</p>
                      <p className="text-2xl font-bold">{stats.totalChildren}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <CreditCard className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Monthly Cost</p>
                      <p className="text-2xl font-bold">{formatCurrency(stats.monthlyCost)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <TrendingUp className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Avg. Progress</p>
                      <p className="text-2xl font-bold">{stats.avgProgress}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <BookOpen className="text-orange-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Active Courses</p>
                      <p className="text-2xl font-bold">{stats.activeCourses}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Children Section */}
              <div className="bg-white rounded-xl shadow mb-8 hover:shadow-md transition-shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">My Children</h2>
                    <div className="flex gap-3">
                      <Link
                        href="/parent-dashboard/children"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View All
                      </Link>
                      <button
                        onClick={handleAddChild}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                      >
                        <Plus size={16} />
                        Add Child
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {children.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No children added yet</h3>
                      <p className="mt-2 text-gray-600">Add your first child to get started.</p>
                      <button
                        onClick={handleAddChild}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={18} className="mr-2" />
                        Add Your First Child
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {children.slice(0, 4).map((child) => (
                        <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors hover:shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{child.name}</h3>
                              <p className="text-gray-600">
                                {child.grade} • {child.school || 'School not specified'}
                                {child.email && <span className="block text-sm text-gray-500">{child.email}</span>}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-600">75%</div>
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                  style={{ width: '75%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <button 
                              onClick={() => router.push(`/parent-dashboard/children/${child.id}`)}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <Eye size={16} />
                              View Profile
                            </button>
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              <Calendar size={16} />
                              Schedule
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
                    <div className="flex gap-3">
                      <Link
                        href="/parent-dashboard/payments"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View All
                      </Link>
                      <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <Download size={16} />
                        Export
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {payments.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-600">No payment history found.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                            <th className="text-left py-3 text-gray-600 font-medium">Description</th>
                            <th className="text-left py-3 text-gray-600 font-medium">Child</th>
                            <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
                            <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.slice(0, 5).map((payment) => (
                            <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4">{formatDate(payment.payment_date || payment.created_at)}</td>
                              <td className="py-4">{payment.description}</td>
                              <td className="py-4">
                                {payment.student_name || payment.child_name || 'General'}
                              </td>
                              <td className="py-4 font-medium">{formatCurrency(payment.amount)}</td>
                              <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                  payment.status === 'completed' 
                                    ? 'bg-green-100 text-green-800'
                                    : payment.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Children Tab */}
          {activeTab === 'children' && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">All Children ({children.length})</h2>
                  <button
                    onClick={handleAddChild}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} />
                    Add New Child
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {children.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-xl font-medium text-gray-900">No children added yet</h3>
                    <p className="mt-2 text-gray-600">Add your first child to start monitoring their progress.</p>
                    <button
                      onClick={handleAddChild}
                      className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={20} className="mr-2" />
                      Add Your First Child
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {children.map((child) => (
                      <div key={child.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors hover:shadow-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{child.name}</h3>
                            <p className="text-gray-600">{child.grade}</p>
                            {child.email && <p className="text-sm text-gray-500 mt-1">{child.email}</p>}
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">
                              {child.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Overall Progress</span>
                              <span className="font-medium">75%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                style={{ width: '75%' }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-lg font-bold text-blue-600">4</div>
                              <div className="text-xs text-gray-600">Courses</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <div className="text-lg font-bold text-green-600">24h</div>
                              <div className="text-xs text-gray-600">Study Time</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/parent-dashboard/children/${child.id}`)}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Eye size={16} />
                              View Details
                            </button>
                            <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
                  <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      <Download size={16} />
                      Export CSV
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <CreditCard size={16} />
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {payments.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-xl font-medium text-gray-900">No payments found</h3>
                    <p className="mt-2 text-gray-600">Your payment history will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Invoice #</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Description</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Child</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                          <th className="text-left py-3 text-gray-600 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4">{formatDate(payment.payment_date || payment.created_at)}</td>
                            <td className="py-4 font-mono text-sm">{payment.invoice_number || 'N/A'}</td>
                            <td className="py-4">{payment.description}</td>
                            <td className="py-4">
                              {payment.student_name || payment.child_name || 'General'}
                            </td>
                            <td className="py-4 font-bold text-gray-900">{formatCurrency(payment.amount)}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                payment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : payment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : payment.status === 'failed'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Receipt
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              </div>
              
              <div className="p-6">
                <div className="max-w-2xl space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={parentData?.user?.name || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={parentData?.user?.email || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                        <span className="ml-2 text-gray-700">Email notifications for child progress</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                        <span className="ml-2 text-gray-700">Payment reminders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <span className="ml-2 text-gray-700">Weekly progress reports</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-sm text-gray-600">
                © {new Date().getFullYear()} Puddle Parent Portal. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}