'use strict';

var mongoose = require("mongoose");
var allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  //Availability indicates days and hours of operations for the company. This will affect the timeline of deadlines, etc.
  availability: {
    days: [{ type: String, enum: allowedDays, required: true }],
    hourOpen: { type: Number },
    hourClosed: { type: Number }
  },
  location: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  //The below three reference to the specific departments, positions, and employees within the company.
  departments: [{ type: String, ref: 'Department' }],
  positions: [{ type: String, ref: 'Position' }],
  employees: [{ type: String, ref: 'Employee' }]

});

//We may not need to record slack information. Let's wait to see once we can toy around with the bot.
//Company-related slack information for tying the slack bot commands to the company's slack domain.
// slack: {
//   team_id: {type:String},
//   team_domain: {type:String},
//   channels: [
//     {
//       channel_id: {type:String},
//       channel_name: {type :String}
//     }
//   ]
// }
module.exports = mongoose.model('Company', companySchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvbW9kZWxzL0NvbXBhbnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckMsSUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQzs7QUFHN0YsSUFBTSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ3hDLE1BQUksRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBQzs7QUFFbEMsY0FBWSxFQUFFO0FBQ1osUUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ3pELFlBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7QUFDeEIsY0FBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztHQUMzQjtBQUNELFVBQVEsRUFBRTtBQUNSLGlCQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0FBQzVCLFFBQUksRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7QUFDcEIsU0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztBQUNyQixPQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0dBQ3BCOztBQUVELGFBQVcsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFDLENBQUM7QUFDaEQsV0FBUyxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUMsQ0FBQztBQUM1QyxXQUFTLEVBQUcsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxDQUFDOztDQWM5QyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2ZXJfYXNzZXRzL21vZGVscy9Db21wYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG5jb25zdCBhbGxvd2VkRGF5cyA9IFsnU3VuZGF5JywnTW9uZGF5JywnVHVlc2RheScsJ1dlZG5lc2RheScsJ1RodXJzZGF5JywnRnJpZGF5JywnU2F0dXJkYXknXTtcblxuXG5jb25zdCBjb21wYW55U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gIG5hbWU6IHt0eXBlOlN0cmluZywgcmVxdWlyZWQ6dHJ1ZX0sXG4gIC8vQXZhaWxhYmlsaXR5IGluZGljYXRlcyBkYXlzIGFuZCBob3VycyBvZiBvcGVyYXRpb25zIGZvciB0aGUgY29tcGFueS4gVGhpcyB3aWxsIGFmZmVjdCB0aGUgdGltZWxpbmUgb2YgZGVhZGxpbmVzLCBldGMuXG4gIGF2YWlsYWJpbGl0eToge1xuICAgIGRheXM6IFt7dHlwZTogU3RyaW5nLCBlbnVtOiBhbGxvd2VkRGF5cywgcmVxdWlyZWQ6IHRydWV9XSxcbiAgICBob3VyT3Blbjoge3R5cGU6IE51bWJlcn0sXG4gICAgaG91ckNsb3NlZDoge3R5cGU6IE51bWJlcn1cbiAgfSxcbiAgbG9jYXRpb246IHtcbiAgICBzdHJlZXRBZGRyZXNzOiB7dHlwZTpTdHJpbmd9LFxuICAgIGNpdHk6IHt0eXBlOiBTdHJpbmd9LFxuICAgIHN0YXRlOiB7dHlwZTogU3RyaW5nfSxcbiAgICB6aXA6IHt0eXBlOiBTdHJpbmd9XG4gIH0sXG4gIC8vVGhlIGJlbG93IHRocmVlIHJlZmVyZW5jZSB0byB0aGUgc3BlY2lmaWMgZGVwYXJ0bWVudHMsIHBvc2l0aW9ucywgYW5kIGVtcGxveWVlcyB3aXRoaW4gdGhlIGNvbXBhbnkuXG4gIGRlcGFydG1lbnRzOiBbe3R5cGU6IFN0cmluZywgcmVmOiAnRGVwYXJ0bWVudCd9XSxcbiAgcG9zaXRpb25zOiBbe3R5cGU6IFN0cmluZywgcmVmOiAnUG9zaXRpb24nfV0sXG4gIGVtcGxveWVlcyA6IFt7dHlwZTogU3RyaW5nLCByZWY6ICdFbXBsb3llZSd9XSxcblxuICAvL1dlIG1heSBub3QgbmVlZCB0byByZWNvcmQgc2xhY2sgaW5mb3JtYXRpb24uIExldCdzIHdhaXQgdG8gc2VlIG9uY2Ugd2UgY2FuIHRveSBhcm91bmQgd2l0aCB0aGUgYm90LlxuICAvL0NvbXBhbnktcmVsYXRlZCBzbGFjayBpbmZvcm1hdGlvbiBmb3IgdHlpbmcgdGhlIHNsYWNrIGJvdCBjb21tYW5kcyB0byB0aGUgY29tcGFueSdzIHNsYWNrIGRvbWFpbi5cbiAgLy8gc2xhY2s6IHtcbiAgLy8gICB0ZWFtX2lkOiB7dHlwZTpTdHJpbmd9LFxuICAvLyAgIHRlYW1fZG9tYWluOiB7dHlwZTpTdHJpbmd9LFxuICAvLyAgIGNoYW5uZWxzOiBbXG4gIC8vICAgICB7XG4gIC8vICAgICAgIGNoYW5uZWxfaWQ6IHt0eXBlOlN0cmluZ30sXG4gIC8vICAgICAgIGNoYW5uZWxfbmFtZToge3R5cGUgOlN0cmluZ31cbiAgLy8gICAgIH1cbiAgLy8gICBdXG4gIC8vIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vbmdvb3NlLm1vZGVsKCdDb21wYW55JywgY29tcGFueVNjaGVtYSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
