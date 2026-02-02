const Privacy = () => {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
  
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              When you visit Mom's Handmade, we may collect personal information such as your name, email address, phone number, and shipping address when you place an order or register on our site.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Process and deliver your orders.</li>
              <li>Improve our website and customer service.</li>
              <li>Send periodic emails regarding your order or other products and services.</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your password is encrypted, and we do not share your data with third parties without your consent.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Cookies</h2>
            <p>
              We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to turn off cookies through your browser settings.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Contact Us</h2>
            <p>
              If there are any questions regarding this privacy policy, you may contact us at <strong>support@momshandmade.com</strong>.
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default Privacy;