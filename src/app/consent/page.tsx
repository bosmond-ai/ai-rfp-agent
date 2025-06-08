import React, { useState } from 'react';
import Link from 'next/link';

const policies = [
  {
    id: 'privacy',
    label: "Bosmond's Privacy Notice",
    summary: "Please refer to the full Bosmond's Privacy Notice if you would like to review the text.",
    url: '/privacy-notice', // TODO: Replace with actual URL
  },
  {
    id: 'cookies',
    label: "Bosmond's Cookies Policy",
    summary: "Please refer to the full Bosmond's Cookies Policy if you would like to review the text.",
    url: '/cookies-policy', // TODO: Replace with actual URL
  },
  {
    id: 'terms',
    label: 'Bosmond Terms of Service',
    summary: (
      <>
        <div>You must not post, upload, publish, submit or transmit any content that:</div>
        <ul className="ml-6 list-disc text-sm">
          <li>infringes, misappropriates or violates any third party intellectual property rights, publicity rights or privacy laws;</li>
          <li>is fraudulent, false, misleading or deceptive;</li>
          <li>denigrates Bosmond or the Bosmond Services;</li>
          <li>violates, or encourages any conduct that would violate, any applicable law or regulation or would give rise to civil liability;</li>
          <li>is defamatory, obscene, pornographic, vulgar, offensive, promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group;</li>
          <li>is violent or threatening or promotes violence or actions that are threatening to any other person; or</li>
          <li>promotes illegal or harmful activities or substances.</li>
        </ul>
        <div>Please refer to the full Bosmond Terms of Service if you would like to review the text.</div>
      </>
    ),
    url: '/terms-of-service', // TODO: Replace with actual URL
  },
];

export default function ConsentPage() {
  const [checked, setChecked] = useState({ privacy: false, cookies: false, terms: false });

  const allChecked = Object.values(checked).every(Boolean);

  const handleChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => ({ ...prev, [id]: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle consent submission (API call, redirect, etc.)
    alert('Thank you for agreeing to our policies!');
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Consent</h1>
      <p className="mb-6 text-gray-700">Before continuing you must agree to the following policies / terms:</p>
      <form onSubmit={handleSubmit}>
        {policies.map((policy) => (
          <div key={policy.id} className="mb-6">
            <div className="flex items-center mb-2">
              <input
                id={policy.id}
                type="checkbox"
                checked={checked[policy.id as keyof typeof checked]}
                onChange={handleChange(policy.id)}
                className="mr-2 h-4 w-4"
                required
              />
              <label htmlFor={policy.id} className="font-semibold">
                I agree to the{' '}
                <Link href={policy.url} className="text-blue-600 underline" target="_blank">
                  {policy.label}
                </Link>.
              </label>
            </div>
            <div className="text-gray-600 text-sm">
              {typeof policy.summary === 'string' ? policy.summary : policy.summary}
            </div>
          </div>
        ))}
        <div className="text-red-600 text-sm mb-4">* Required</div>
        <button
          type="submit"
          disabled={!allChecked}
          className={`w-full py-2 px-4 rounded font-semibold text-white ${
            allChecked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </form>
    </main>
  );
} 