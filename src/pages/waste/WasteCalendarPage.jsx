import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wasteCalendar } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import './waste.css';

const WasteCalendarPage = () => {
  const navigate = useNavigate();
  const [month] = useState('Aprile 2026');

  // Group by week rows for display
  const rows = wasteCalendar;

  return (
    <div className="waste-calendar-page">
      <PageHeader
        title="Scarti"
        subtitle={month}
      />

      <div className="waste-calendar__body">
        <div className="waste-calendar__card">

          {/* Column headers */}
          <div className="waste-calendar__header-row">
            <div className="waste-calendar__col-day">Giorno</div>
            <div className="waste-calendar__col-type">INVENDUTO</div>
            <div className="waste-calendar__col-type">PRODUZIONE</div>
          </div>

          {/* Day rows */}
          <div className="waste-calendar__rows">
            {rows.map((row) => {
              const dayNum = new Date(row.date).getDate();
              return (
                <div
                  key={row.date}
                  className="waste-calendar__row"
                  onClick={() => navigate(`/waste/${row.date}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/waste/${row.date}`)}
                >
                  <div className="waste-calendar__col-day">
                    <span className="waste-calendar__day-num">{dayNum}</span>
                    <span className="waste-calendar__day-name">{row.dayName}</span>
                  </div>

                  <div className="waste-calendar__col-type">
                    <DotIndicator filled={row.invenduto} />
                  </div>

                  <div className="waste-calendar__col-type">
                    <DotIndicator filled={row.produzione} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

const DotIndicator = ({ filled }) => (
  <span className={`waste-dot ${filled ? 'waste-dot--filled' : 'waste-dot--empty'}`} />
);

export default WasteCalendarPage;