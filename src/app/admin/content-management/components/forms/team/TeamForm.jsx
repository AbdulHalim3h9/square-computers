'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit, User, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Import the popup form with no SSR
const PopupTeamForm = dynamic(
  () => import('./PopupTeamForm'),
  { ssr: false }
);

// Mock data - replace with API calls in a real application
const mockTeam = [
  {
    id: '1',
    name: 'John Doe',
    position: 'CEO & Founder',
    bio: 'Visionary leader with 10+ years of experience in the tech industry.',
    image: '/images/team/placeholder.jpg',
    socialLinks: {
      twitter: 'johndoe',
      linkedin: 'johndoe',
      github: 'johndoe'
    },
    isActive: true,
    joinedAt: '2020-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'CTO',
    bio: 'Technology enthusiast with a passion for building scalable systems.',
    image: '/images/team/placeholder2.jpg',
    socialLinks: {
      twitter: 'janesmith',
      linkedin: 'janesmith',
      github: 'janesmith'
    },
    isActive: true,
    joinedAt: '2020-03-22T00:00:00Z'
  },
];

export default function TeamForm() {
  // State
  const [team, setTeam] = useState(mockTeam);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Handle form submission from popup
  const handleSubmit = (memberData) => {
    if (editingMember) {
      // Update existing member
      setTeam(prev => 
        prev.map(member => 
          member.id === editingMember.id
            ? { ...memberData, id: editingMember.id }
            : member
        )
      );
      toast.success('Team member updated successfully');
    } else {
      // Add new member
      const newMember = {
        ...memberData,
        id: Date.now().toString(),
        joinedAt: new Date().toISOString()
      };
      setTeam(prev => [newMember, ...prev]);
      toast.success('Team member added successfully');
    }
    
    // Close the form
    setEditingMember(null);
    setIsFormOpen(false);
  };

  // Delete a team member
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeam(prev => prev.filter(member => member.id !== id));
      toast.success('Team member removed successfully');
    }
  };

  // Toggle member status
  const toggleStatus = (id) => {
    setTeam(prev =>
      prev.map(member =>
        member.id === id
          ? { ...member, isActive: !member.isActive }
          : member
      )
    );
    toast.success('Team member status updated');
  };
  
  // Open form for editing
  const openEditForm = (member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };
  
  // Open form for new member
  const openNewForm = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };
  
  // Close form
  const closeForm = () => {
    setEditingMember(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team members and their information
          </p>
        </div>
        <button
          onClick={openNewForm}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new team member.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={openNewForm}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                New Team Member
              </button>
            </div>
          </div>
        ) : (
          team.map((member) => (
            <div 
              key={member.id}
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-gray-200">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {member.position}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                  {member.bio || 'No bio provided.'}
                </p>
                
                <div className="mt-4 flex space-x-3">
                  {member.socialLinks?.twitter && (
                    <a
                      href={`https://twitter.com/${member.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                      title="Twitter"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${member.socialLinks.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-700"
                      title="LinkedIn"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.2 1.778 3.2 4.091v4.715zM5.337 7.433c-.81 0-1.468-.66-1.468-1.467 0-.809.658-1.467 1.468-1.467.81 0 1.468.658 1.468 1.467 0 .808-.659 1.467-1.468 1.467zm1.22 8.926H4.11v-8.59H6.56v8.59zM17.34 0H2.66C1.194 0 0 1.194 0 2.66v14.68C0 18.805 1.194 20 2.66 20h14.68C18.805 20 20 18.805 20 17.34V2.66C20 1.194 18.805 0 17.34 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {member.socialLinks?.github && (
                    <a
                      href={`https://github.com/${member.socialLinks.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700"
                      title="GitHub"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.36.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Joined {new Date(member.joinedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => toggleStatus(member.id)}
                    className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                      member.isActive 
                        ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200' 
                        : 'text-green-700 bg-green-100 hover:bg-green-200'
                    }`}
                  >
                    {member.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditForm(member)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(member.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Popup Form */}
      <PopupTeamForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleSubmit}
        initialData={editingMember}
      />
    </div>
  );
}
