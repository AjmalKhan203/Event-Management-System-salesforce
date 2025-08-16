public with sharing class StudentRegistrationController {

    // Get list of events for dropdown
    @AuraEnabled(cacheable=true)
    public static List<Event__c> getEvents() {
        return [
            SELECT Id, Name, Date__c 
            FROM Event__c
            ORDER BY Date__c ASC
        ];
    }

    // Register a student for an event
    @AuraEnabled
    public static String registerStudent(String name, String email, String department, Id eventId) {
        try {
            // Validate inputs before doing anything
            if (String.isBlank(name) || String.isBlank(email) || eventId == null) {
                throw new AuraHandledException('Name, email, and event must be provided.');
            }

            // Find or create student
            Student__c student;
            List<Student__c> existing = [
                SELECT Id
                FROM Student__c
                WHERE Email__c = :email
                LIMIT 1
            ];
            if (!existing.isEmpty()) {
                student = existing[0];
            } else {
                student = new Student__c(
                    Name = name,
                    Department__c = department,
                    Email__c = email
                );
                insert student;
            }

            // Create registration
            Registration__c reg = new Registration__c(
                Name = name,
                Student__c = student.Id,
                Event__c = eventId,
                Email__c = email,
                Registration_Date__c = Date.today()
            );
            insert reg;

            // Success — return a message for LWC
            return 'Registration successful!';

        } catch (Exception e) {
            // Log the error for debugging
            System.debug('ERROR in registerStudent: ' + e.getMessage());
            throw new AuraHandledException('Registration failed: ' + e.getMessage());
        }
    }
}
