-- SQLite

select destinationCountry as Country, cast(year as text) || '-' || cast((month+1) as text) as date,
SUM(dataUsage) as dataUsage, SUM(dataCharges) as dataCharges,
SUM(smsUsage) as smsUsage, SUM(smsCharges) as smsCharges,
SUM(mocUsage) as mocUsage, SUM(mocCharges) as mocCharges,
SUM(mtcUsage) as mtcUsage, SUM(mtcCharges) as mtcCharges
from Clears
where destinationCountry <> '(blank)'
group by destinationCountry, year, month
