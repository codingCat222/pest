import React, { useState } from 'react';
import { CaseRecord } from '../../types';
import { 
  Activity, 
  CheckCircle2, 
  TrendingDown, 
  Equal, 
  TrendingUp, 
  HelpCircle, 
  Upload, 
  Check, 
  ArrowRight,
  Camera,
  Calendar
} from 'lucide-react';

interface ActivityMonitoringViewProps {
  activeCase: CaseRecord;
  onUpdateCase: (updated: CaseRecord) => void;
}

export const ActivityMonitoringView: React.FC<ActivityMonitoringViewProps> = ({
  activeCase,
  onUpdateCase
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'No activity' | 'Less activity' | 'Same activity' | 'More activity' | 'Not sure'>('Less activity');
  const [comments, setComments] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const options = [
    {
      level: 'No activity' as const,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: 'No activity',
      description: 'Zero sightings, fresh droppings, or noises detected in the last 48 hours.'
    },
    {
      level: 'Less activity' as const,
      icon: TrendingDown,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Less activity',
      description: 'Noticeable reduction in scratching sounds or bait station disturbance.'
    },
    {
      level: 'Same activity' as const,
      icon: Equal,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: 'Same activity',
      description: 'Activity level remains identical to when stations were placed.'
    },
    {
      level: 'More activity' as const,
      icon: TrendingUp,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      title: 'More activity',
      description: 'Fresh droppings, gnawing marks, or active nocturnal movement noted.'
    },
    {
      level: 'Not sure' as const,
      icon: HelpCircle,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
      title: 'Not sure',
      description: 'Bait partially disturbed or evidence is inconclusive.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTimeline = [...activeCase.timeline];
    updatedTimeline.push({
      title: `Activity Report: ${selectedLevel}`,
      date: 'Today',
      completed: true,
      details: comments ? `Customer note: "${comments}"` : `Logged observation: ${selectedLevel}`
    });

    const updated: CaseRecord = {
      ...activeCase,
      activityReported: selectedLevel,
      activityNotes: comments || activeCase.activityNotes,
      lastReportedDate: 'Today',
      timeline: updatedTimeline
    };

    onUpdateCase(updated);
    setIsSubmitted(true);
  };

  const progressPercentage = Math.round((activeCase.monitoringDay / activeCase.monitoringDaysTotal) * 100);

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Activity &amp; Monitoring
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Guided 7-day observation period for {activeCase.propertyName} ({activeCase.pest}).
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Monitoring Progress
            </div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              Day {activeCase.monitoringDay} of {activeCase.monitoringDaysTotal}
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 self-start sm:self-auto">
            {activeCase.monitoringDaysTotal - activeCase.monitoringDay} days remaining
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Day 1 (Start)</span>
            <span>Day 4 (Current)</span>
            <span>Day 7 (Evaluation)</span>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200/90 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Activity Report Recorded</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your observation has been synced to your customer journey record. Continue monitoring until Day 7.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Submit Another Update
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              What are you seeing?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select the option that best reflects recent indications around your bait stations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedLevel === opt.level;
              return (
                <button
                  key={opt.level}
                  type="button"
                  onClick={() => setSelectedLevel(opt.level)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20' 
                      : 'border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg ${opt.bgColor} ${opt.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{opt.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-normal">{opt.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Comments &amp; Specific Locations
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="e.g. Bait blocks under sink partially eaten; heard light scratching on Tuesday night."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Upload Photographs (Optional)
            </label>
            <div className="border border-dashed border-slate-300 rounded-xl p-5 text-center cursor-pointer hover:bg-slate-50 transition-colors">
              <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <div className="text-xs font-medium text-slate-700">
                {uploadedFile ? `Selected: ${uploadedFile}` : 'Drag & drop photos of droppings or bait stations'}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedFile(e.target.files[0].name);
                  }
                }}
                className="hidden"
                id="fileMonitoringUpload"
              />
              <label 
                htmlFor="fileMonitoringUpload"
                className="mt-2 inline-block text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Browse local files
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Activity Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Historical Activity Log
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-slate-800">Observation: Less activity</div>
              <div className="text-slate-500 mt-0.5">Checked bait stations in kitchen void; slight feeding marks observed.</div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono shrink-0">Yesterday</span>
          </div>

          <div className="py-3 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-slate-800">Initial Setup &amp; Station Deployment</div>
              <div className="text-slate-500 mt-0.5">Stations installed along cavity skirting run and behind cooker.</div>
            </div>
            <span className="text-[11px] text-slate-400 font-mono shrink-0">22 Sep 2026</span>
          </div>
        </div>
      </div>

    </div>
  );
};
