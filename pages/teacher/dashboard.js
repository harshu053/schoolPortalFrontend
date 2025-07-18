import { useAuth } from '../../context/AuthContext';
import Navigation from '../../components/Navigation';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function TeacherDashboard() {
    const { user } = useAuth();

    return (
        <ProtectedRoute permissions={['view_students', 'view_classes']}>
            <div className="min-h-screen bg-gray-100">
                <Navigation />
                
                <main className="py-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Teacher Dashboard
                                </h1>
                                
                                <div className="mt-6">
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                                            <div className="p-5">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-blue-900 truncate">
                                                                Today's Classes
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
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-green-900 truncate">
                                                                Attendance Marked
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
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-yellow-900 truncate">
                                                                Total Students
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
