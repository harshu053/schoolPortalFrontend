import { useAuth } from '../../contexts/AuthContext';
import Navigation from '../../components/Navigation';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function SchoolDashboard() {
    const { user } = useAuth();

    return (
        <ProtectedRoute permissions={['manage_school_settings']}>
            <div className="min-h-screen bg-gray-100">
                <Navigation />
                
                <main className="py-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    School Management Dashboard
                                </h1>
                                
                                <div className="mt-6">
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {/* School Stats */}
                                        <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                                            <div className="p-5">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-blue-900 truncate">
                                                                Total Students
                                                            </dt>
                                                            <dd className="flex items-baseline">
                                                                <div className="text-2xl font-semibold text-blue-900">
                                                                    --
                                                                </div>
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                                            <div className="p-5">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-green-900 truncate">
                                                                Total Teachers
                                                            </dt>
                                                            <dd className="flex items-baseline">
                                                                <div className="text-2xl font-semibold text-green-900">
                                                                    --
                                                                </div>
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-yellow-50 overflow-hidden shadow rounded-lg">
                                            <div className="p-5">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-yellow-900 truncate">
                                                                Today's Attendance
                                                            </dt>
                                                            <dd className="flex items-baseline">
                                                                <div className="text-2xl font-semibold text-yellow-900">
                                                                    --
                                                                </div>
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
