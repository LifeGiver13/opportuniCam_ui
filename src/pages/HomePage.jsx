import React, { useState } from 'react';
import Navbar from '../components/common/NavBar';
import './HomePage.css';

const jobListings = [
    {
        id: 1,
        title: "Marketing Intern",
        company: "Orange Cameroun",
        location: "Yaoundé",
        timeAgo: "1 week ago",
        description: "Support the marketing team in campaign development and social media management.",
        category: "Marketing",
        type: "Internship",
        tagColor: "blue"
    },
    {
        id: 2,
        title: "Data Analyst",
        company: "BGFI Bank",
        location: "Douala",
        timeAgo: "3 days ago",
        description: "Analyze financial data and create reports to support business decisions.",
        category: "Finance",
        type: "Full-time",
        tagColor: "green"
    },
    {
        id: 3,
        title: "Customer Service Representative",
        company: "Nexttel",
        location: "Bafoussam",
        timeAgo: "5 days ago",
        description: "Provide excellent customer support through phone, email, and in-person interactions.",
        category: "Customer Service",
        type: "Full-time",
        tagColor: "green"
    },
    {
        id: 4,
        title: "Software Developer",
        company: "MTN Cameroon",
        location: "Douala",
        timeAgo: "2 days ago",
        description: "Develop and maintain mobile and web applications for MTN services.",
        category: "Technology",
        type: "Full-time",
        tagColor: "green"
    }
];

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredJobs = jobListings.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            activeFilter === "All" ||
            (activeFilter === "Jobs" && job.type === "Full-time") ||
            (activeFilter === "Internships" && job.type === "Internship");

        return matchesSearch && matchesFilter;
    });

    return (
        <>


            {/* Hero Section - Landing Style */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Find Your Next Opportunity</h1>
                    <p>Connecting Cameroonian youth with jobs and internships across the country.</p>

                    <div className="hero-buttons">
                        <button className="btn-primary">Browse Jobs</button>
                        <button className="btn-secondary">Upload Resume</button>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1653566031587-114b636e182b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                        alt="People working"
                    />
                </div>
            </div>

            {/* Search & Filter Section */}
            <div className="search-section">
                <div className="search-container">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search jobs, companies, or locations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-tabs">
                        <button
                            className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('All')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'Jobs' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Jobs')}
                        >
                            Jobs
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'Internships' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('Internships')}
                        >
                            Internships
                        </button>
                    </div>
                </div>

                <p className="results-count">
                    {filteredJobs.length} opportunities found
                </p>
            </div>

            {/* Job Listings */}
            <div className="jobs-container">
                {filteredJobs.map(job => (
                    <div key={job.id} className="job-card">
                        <div className="job-header">
                            <h3>{job.title}</h3>
                            <div className="job-type">
                                <span className={`type-tag ${job.tagColor}`}>{job.type}</span>
                            </div>
                        </div>

                        <div className="job-meta">
                            <span>🏢 {job.company}</span>
                            <span>📍 {job.location}</span>
                            <span>🕒 {job.timeAgo}</span>
                        </div>

                        <p className="job-description">{job.description}</p>

                        <div className="job-footer">
                            <span className="category-tag">{job.category}</span>
                            <button className="btn-view-details">View Details</button>
                        </div>
                    </div>
                ))}

                {filteredJobs.length === 0 && (
                    <p className="no-results">No opportunities found matching your search.</p>
                )}
            </div>
        </>
    );
};

export default HomePage;