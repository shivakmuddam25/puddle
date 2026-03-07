// app/admin-docs/page.tsx
"use client"

import Link from 'next/link';
import { 
  Home,
  ChevronLeft,
  BookOpen,
  FileText,
  Shield,
  Users,
  Settings,
  Database,
  BarChart,
  AlertTriangle,
  HelpCircle,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Upload,
  Key,
  Lock,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Printer,
  Share2,
  Bookmark,
  ExternalLink,
  Copy,
  RefreshCw,
  Zap,
  Cpu,
  HardDrive,
  Network,
  Server, 
  Info
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function AdminDocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  // Documentation sections
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap className="h-5 w-5" />,
      content: [
        {
          title: 'Admin Portal Overview',
          items: [
            'Welcome to the Puddle Admin Portal - your centralized management system',
            'This portal allows authorized personnel to manage all aspects of the learning platform',
            'Access is restricted based on role-based permissions'
          ]
        },
        {
          title: 'First Time Setup',
          items: [
            'Ensure you have received proper authorization from the system administrator',
            'Use the credentials provided by IT support',
            'Complete the two-factor authentication setup (if enabled)',
            'Review and accept the admin terms of service'
          ]
        },
        {
          title: 'System Requirements',
          items: [
            'Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)',
            'Stable internet connection (minimum 5 Mbps)',
            'Screen resolution: 1366x768 or higher',
            'Enable JavaScript and cookies in your browser'
          ]
        }
      ]
    },
    {
      id: 'role-guides',
      title: 'Role Guides',
      icon: <Users className="h-5 w-5" />,
      content: [
        {
          title: 'Content Creator Guide',
          items: [
            'Content Creation Dashboard: Access all creation tools from the main dashboard',
            'Question Bank Management: Create, edit, and organize questions by subject and difficulty',
            'Study Material Upload: Upload PDFs, videos, and interactive content',
            'Content Scheduling: Schedule content release dates and times',
            'Version Control: Manage different versions of your content'
          ]
        },
        {
          title: 'Reviewer Guide',
          items: [
            'Review Queue: Access pending content for review',
            'Quality Guidelines: Follow the established content quality standards',
            'Approval Workflow: Approve, reject, or request revisions on content',
            'Feedback System: Provide constructive feedback to creators',
            'Review History: Track all your review activities'
          ]
        },
        {
          title: 'Graphics Designer Guide',
          items: [
            'Media Library: Access and manage all visual assets',
            'Design Tools: Use built-in design tools for creating visuals',
            'Template System: Work with pre-approved templates',
            'Brand Guidelines: Follow Puddle brand standards',
            'Asset Optimization: Ensure images and videos are optimized for web'
          ]
        },
        {
          title: 'Administrator Guide',
          items: [
            'User Management: Add, edit, suspend, or delete user accounts',
            'Role Assignment: Assign and modify user roles and permissions',
            'System Configuration: Modify platform settings and configurations',
            'Billing Management: Handle subscription and payment issues',
            'Security Settings: Configure security protocols and access controls'
          ]
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: <Settings className="h-5 w-5" />,
      content: [
        {
          title: 'Managing Users',
          items: [
            'Adding New Users: Navigate to Users → Add New',
            'Editing User Profiles: Click on any user to edit their details',
            'Bulk Actions: Select multiple users for batch operations',
            'User Import: Import users via CSV file',
            'Account Status: Activate, deactivate, or suspend accounts'
          ]
        },
        {
          title: 'Permissions & Roles',
          items: [
            'Role Hierarchy: Understand the permission hierarchy system',
            'Custom Roles: Create custom roles with specific permissions',
            'Permission Overrides: Grant temporary permission overrides',
            'Audit Logs: Review permission changes and access logs'
          ]
        },
        {
          title: 'Student Management',
          items: [
            'Enrollment Management: Manage course enrollments',
            'Progress Tracking: Monitor student learning progress',
            'Performance Analytics: View student performance reports',
            'Communication Tools: Send announcements and notifications'
          ]
        }
      ]
    },
    {
      id: 'content-management',
      title: 'Content Management',
      icon: <FileText className="h-5 w-5" />,
      content: [
        {
          title: 'Content Workflow',
          items: [
            'Creation → Review → Approval → Publishing',
            'Content Versioning: Maintain multiple versions',
            'Scheduled Publishing: Set future publish dates',
            'Content Archiving: Archive old or outdated content'
          ]
        },
        {
          title: 'Media Management',
          items: [
            'Upload Guidelines: File types, sizes, and formats',
            'Media Library Organization: Use tags and categories',
            'Optimization Tips: Reduce file sizes without quality loss',
            'Copyright Compliance: Ensure all media is properly licensed'
          ]
        },
        {
          title: 'Assessment Creation',
          items: [
            'Question Types: MCQs, descriptive, matching, etc.',
            'Difficulty Levels: Set appropriate difficulty ratings',
            'Answer Key Management: Create and manage answer keys',
            'Assessment Templates: Use and create templates'
          ]
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          title: 'Access Control',
          items: [
            'Two-Factor Authentication: Setup and management',
            'IP Whitelisting: Restrict access to specific IP ranges',
            'Session Management: Configure session timeouts',
            'Login Attempt Limits: Prevent brute force attacks'
          ]
        },
        {
          title: 'Data Protection',
          items: [
            'GDPR Compliance: Handle user data responsibly',
            'Data Encryption: Understand encryption protocols',
            'Backup Procedures: Regular data backup processes',
            'Data Retention: Policies for data retention and deletion'
          ]
        },
        {
          title: 'Audit Trails',
          items: [
            'Activity Logs: Review all admin activities',
            'Change Tracking: Track all system changes',
            'Export Logs: Export logs for external analysis',
            'Alert System: Configure security alerts'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <HelpCircle className="h-5 w-5" />,
      content: [
        {
          title: 'Common Issues',
          items: [
            'Login Problems: Password reset, account lockouts',
            'Upload Errors: File size limits, format issues',
            'Performance Issues: Slow loading, timeouts',
            'Display Issues: Browser compatibility, responsive design'
          ]
        },
        {
          title: 'Error Codes',
          items: [
            '403: Forbidden - Insufficient permissions',
            '404: Not Found - Resource unavailable',
            '500: Server Error - Internal server issue',
            '503: Service Unavailable - Maintenance or overload'
          ]
        },
        {
          title: 'Support Channels',
          items: [
            'IT Support: support@puddle.com (24/7)',
            'Urgent Issues: Call +1-800-PUDDLE-HELP',
            'Feature Requests: Submit via internal portal',
            'Bug Reports: Use the bug reporting tool'
          ]
        }
      ]
    },
    {
      id: 'api-integration',
      title: 'API & Integration',
      icon: <Cpu className="h-5 w-5" />,
      content: [
        {
          title: 'API Documentation',
          items: [
            'REST API Endpoints: Complete API reference',
            'Authentication: API keys and OAuth 2.0',
            'Rate Limits: Request limitations and quotas',
            'Webhooks: Available webhook events'
          ]
        },
        {
          title: 'Third-Party Integrations',
          items: [
            'Google Workspace: Calendar and Drive integration',
            'Microsoft 365: Teams and SharePoint integration',
            'Payment Gateways: Stripe, Razorpay integration',
            'Analytics Tools: Google Analytics, Mixpanel'
          ]
        }
      ]
    },
    {
      id: 'reports-analytics',
      title: 'Reports & Analytics',
      icon: <BarChart className="h-5 w-5" />,
      content: [
        {
          title: 'Available Reports',
          items: [
            'User Activity Reports: Daily, weekly, monthly',
            'Content Performance: Engagement metrics',
            'Financial Reports: Revenue, subscriptions',
            'System Performance: Uptime, load times'
          ]
        },
        {
          title: 'Export Options',
          items: [
            'Formats: PDF, Excel, CSV, JSON',
            'Scheduled Exports: Automated report generation',
            'Custom Reports: Create custom report templates',
            'Data Visualization: Charts and graphs'
          ]
        }
      ]
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    content: section.content.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.some(itemText => itemText.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(section => section.content.length > 0);

  const activeSectionData = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-2 rounded-full">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-800 font-serif">Puddle</span>
                  <span className="text-xs text-gray-600 italic -mt-1">Admin Documentation</span>
                </div>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/admin-login" className="text-gray-700 hover:text-gray-900 font-medium">
                Admin Login
              </Link>
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Main Site
              </Link>
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <Printer className="h-4 w-4" />
                Print Guide
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Navigation */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/admin-login" 
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium group"
          >
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Admin Login
          </Link>
          <div className="text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admin Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and resources for Puddle platform administrators
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Documentation Sections
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`p-1 rounded ${
                        activeSection === section.id
                          ? 'bg-white/20'
                          : 'bg-gray-100'
                      }`}>
                        {section.icon}
                      </div>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
                  <div className="space-y-2">
                    <Link href="/admin-login" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-100">
                      <ArrowRight className="h-4 w-4" />
                      Admin Login
                    </Link>
                    <Link href="/system-status" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-100">
                      <Server className="h-4 w-4" />
                      System Status
                    </Link>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-100 w-full text-left">
                      <Download className="h-4 w-4" />
                      Download PDF Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Documentation Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      {activeSectionData.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{activeSectionData.title}</h2>
                      <p className="text-gray-300 mt-2">
                        Complete guide and reference for {activeSectionData.title.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {searchQuery ? (
                    // Search Results View
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Search Results for "{searchQuery}"
                      </h3>
                      {filteredSections.length > 0 ? (
                        filteredSections.map((section) => (
                          <div key={section.id} className="mb-8">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              {section.icon}
                              {section.title}
                            </h4>
                            {section.content.map((item, index) => (
                              <div key={index} className="mb-6">
                                <h5 className="font-bold text-gray-800 mb-3">{item.title}</h5>
                                <ul className="space-y-2">
                                  {item.items.map((listItem, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700">{listItem}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular View
                    <div className="space-y-8">
                      {activeSectionData.content.map((item, index) => (
                        <div key={index} className="border-b border-gray-100 pb-8 last:border-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                            {item.title}
                          </h3>
                          <ul className="space-y-3">
                            {item.items.map((listItem, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <ArrowRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                        <Bookmark className="h-4 w-4" />
                        Bookmark This Page
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 className="h-4 w-4" />
                        Share Guide
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Printer className="h-4 w-4" />
                        Print Section
                      </button>
                      <Link 
                        href="/contact-support" 
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <HelpCircle className="h-4 w-4" />
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Sections */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {sections
                    .filter(s => s.id !== activeSection)
                    .slice(0, 4)
                    .map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {section.icon}
                          </div>
                          <h4 className="font-bold text-gray-900">{section.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Learn about {section.title.toLowerCase()} and related procedures
                        </p>
                      </button>
                    ))}
                </div>
              </div>

              {/* Version Info */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Documentation Version 2.1.0</h4>
                    <p className="text-blue-700 text-sm">
                      This documentation is regularly updated. Always check for the latest version before 
                      following procedures. Major changes are highlighted in the changelog.
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-blue-600">
                        <strong>Last Major Update:</strong> March 15, 2024
                      </span>
                      <span className="text-xs text-blue-600">
                        <strong>Next Review:</strong> June 15, 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Puddle Learning Platform. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                This documentation is confidential and intended for authorized personnel only.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
              <div className="text-xs text-gray-500">
                v2.1.0 • Doc ID: ADM-2024-03
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}