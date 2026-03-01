import React, { useContext, useState, useEffect } from 'react'
import delete4 from '../assets/delete4.svg'
import { jsPDF } from "jspdf"
import 'jspdf-autotable'
import { PromoCodesContext } from '../context/PromoCodesContext'
import { Button } from '../components/ui/button'

export default function Marketing() {

    const { allpromocodes, fetchAllPromocodes, addPromocode, addFeature, deletePromocode, allfeatures, fetchAllFeatures, deleteFeature } = useContext(PromoCodesContext);

    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    const [featureName, setFeatureName] = useState('');

    useEffect(() => {
        fetchAllPromocodes();
        fetchAllFeatures();
    }, [fetchAllPromocodes, fetchAllFeatures]);

    const parsedExpiryDate = new Date(expiry_date);
    const PromocodeData = {
        code,
        discount,
        expiry_date: parsedExpiryDate
    };

    const handleAddPromocode = (e) => {
        e.preventDefault();
        addPromocode(PromocodeData);
        setCode('');
        setDiscount('');
        setExpiry_date('');
    }

    const featureData = {
        feature_name: featureName
    }

    const handleAddFeature = (e) => {
        e.preventDefault();
        addFeature(featureData);
        setFeatureName('');
    }

    const downloadEmailList = async (format) => {
        try {
            const response = await fetch('https://skystayserver-n8xf.onrender.com/emails');
            const emailList = await response.json();

            if (format === 'pdf') {
                downloadPDF(emailList);
            }
        } catch (error) {
            console.error('Error fetching email list:', error);
        }
    };

    const downloadPDF = (emailList) => {
        const doc = new jsPDF();
        doc.text("Email List", 20, 10);
        const headers = [["ID", "Email"]];
        const rows = emailList.map(email => [email.id, email.email]);
        doc.autoTable({ head: headers, body: rows });
        doc.save("email_list.pdf");
    };

    return (
        <div className='font-outfit pb-20 max-w-7xl mx-auto'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4'>
                <div>
                    <h1 className='text-3xl font-sentientmedium text-gray-900 tracking-tight'>Marketing</h1>
                    <p className='text-gray-500 font-light mt-1'>Manage promotional campaigns, discount codes, and platform features.</p>
                </div>
                <Button variant='promo' onClick={() => downloadEmailList('pdf')} className='shadow-glow-blue flex items-center gap-2'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Download Email List (PDF)
                </Button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
                {/* Add Promocode Section */}
                <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-8'>
                    <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
                        <div className="w-8 h-8 rounded-full bg-pink/10 flex items-center justify-center text-pink">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        Add Promocode
                    </h2>

                    <div className='space-y-4 mb-6'>
                        <div>
                            <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-1.5'>Code Name</label>
                            <input value={code} className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-colors' onChange={(e) => setCode(e.target.value)} placeholder='e.g. SUMMER2024' />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-1.5'>Discount (%)</label>
                                <input value={discount} type='number' min={0} max={100} className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-colors' onChange={(e) => setDiscount(e.target.value)} placeholder='0-100' />
                            </div>
                            <div>
                                <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-1.5'>Expiry Date</label>
                                <input value={expiry_date} type='date' className='w-full rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-colors' onChange={(e) => setExpiry_date(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <Button className='w-full rounded-xl bg-gray-900 text-white hover:bg-black transition-all pt-5 pb-5' onClick={handleAddPromocode}>
                        Create Promocode
                    </Button>
                </div>

                {/* Add Feature Section */}
                <div className='bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-6 lg:p-8 flex flex-col'>
                    <h2 className='text-xl font-sentientmedium text-gray-900 mb-6 flex items-center gap-3'>
                        <div className="w-8 h-8 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143z"></path></svg>
                        </div>
                        Add Platform Feature
                    </h2>

                    <div className='mb-6'>
                        <label className='block text-[10px] font-semibold uppercase text-gray-500 mb-1.5'>Feature Name</label>
                        <div className='flex gap-3'>
                            <input value={featureName} onChange={(e) => setFeatureName(e.target.value)} className='flex-1 rounded-xl bg-slate-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-colors' placeholder='e.g. Premium Support' />
                            <Button className='rounded-xl bg-blue text-white px-6 shadow-glow-blue hover:bg-pink transition-colors' onClick={handleAddFeature}>Add</Button>
                        </div>
                    </div>

                    <div className='mt-auto flex-1'>
                        <h3 className='text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2'>Active Features</h3>
                        <div className='max-h-[160px] overflow-y-auto pr-2 space-y-2 custom-scrollbar'>
                            {allfeatures.length > 0 ? allfeatures.map((feature) => (
                                <div key={feature.id} className='flex justify-between items-center bg-slate-50 border border-gray-100 rounded-lg p-3 group'>
                                    <span className='text-sm text-gray-700 font-medium'>{feature.feature_name}</span>
                                    <button onClick={() => deleteFeature(feature.id)} className='text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline font-medium'>
                                        Remove
                                    </button>
                                </div>
                            )) : (
                                <p className='text-xs text-gray-400 font-light italic text-center py-4'>No features added yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* All Promocodes */}
            <div>
                <div className='flex items-center gap-4 mb-6'>
                    <h2 className='text-xl font-sentientmedium text-gray-900'>Active Promocodes</h2>
                    <div className='h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent' />
                </div>

                {allpromocodes.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allpromocodes.map((promocode) => {
                            const expiryDate = new Date(promocode.expiry_date);
                            const isExpired = expiryDate < new Date();

                            return (
                                <div key={promocode.id} className='bg-white/60 border border-gray-100 rounded-2xl p-5 relative overflow-hidden group hover:bg-white hover:shadow-soft-lift transition-all'>
                                    <div className={`absolute top-0 left-0 w-1 h-full ${isExpired ? 'bg-red-400' : 'bg-green-400'}`}></div>

                                    <div className='flex justify-between items-start mb-4 pl-3'>
                                        <div>
                                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5'>Code</span>
                                            <span className='text-xl font-mono text-gray-900 tracking-tight'>{promocode.code}</span>
                                        </div>
                                        <div className='bg-pink/10 text-pink font-bold text-sm px-3 py-1.5 rounded-lg'>
                                            {promocode.discount}% OFF
                                        </div>
                                    </div>

                                    <div className='pl-3 mb-4 flex items-center justify-between'>
                                        <div>
                                            <span className='text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5'>Expires On</span>
                                            <span className={`text-sm ${isExpired ? 'text-red-500 font-medium' : 'text-gray-700'}`}>
                                                {expiryDate.toLocaleDateString()}
                                            </span>
                                        </div>
                                        {isExpired && <span className='text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold uppercase'>Expired</span>}
                                    </div>

                                    <div className='pt-4 border-t border-gray-100 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <button className='flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors' onClick={() => deletePromocode(promocode.id)}>
                                            <img className='h-3' src={delete4} alt='delete' style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                                            Delete Code
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className='bg-white/50 border border-gray-100 rounded-3xl p-10 text-center shadow-sm'>
                        <p className='text-gray-500 font-light'>No active promocodes found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
