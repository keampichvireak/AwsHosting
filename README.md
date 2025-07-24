Certainly! Here's a clear and practical approach for creating Organizational Units (OUs), Users, and other resources via PowerShell commands for testing an Active Directory migration. This method allows you to verify clearly if any data is lost after migration.

---

## 🔰 Step 1: Create Organizational Units (OUs)

First, clearly structure your OU hierarchy. For example:

```
iconic.local
├── IT
├── HR
├── Finance
└── Marketing
```

### PowerShell Commands to create OUs:

```powershell
Import-Module ActiveDirectory

# Define your OUs
$OUs = @("IT", "HR", "Finance", "Marketing")

# Create OUs
foreach ($OU in $OUs) {
    New-ADOrganizationalUnit -Name $OU -Path "DC=iconic,DC=local"
}
```

---

## 🔰 Step 2: Create Test Users in Each OU

Next, create several users within each OU.

### Example Users:

| OU        | Users                |
| --------- | -------------------- |
| IT        | ituser01, ituser02   |
| HR        | hruser01, hruser02   |
| Finance   | finuser01, finuser02 |
| Marketing | mktuser01, mktuser02 |

### PowerShell Commands to create users:

```powershell
$UserList = @{
    "IT"        = @("ituser01", "ituser02")
    "HR"        = @("hruser01", "hruser02")
    "Finance"   = @("finuser01", "finuser02")
    "Marketing" = @("mktuser01", "mktuser02")
}

foreach ($OU in $UserList.Keys) {
    foreach ($User in $UserList[$OU]) {
        New-ADUser -Name $User `
                   -GivenName $User `
                   -Surname "Test" `
                   -UserPrincipalName "$User@iconic.local" `
                   -SamAccountName $User `
                   -AccountPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) `
                   -Enabled $true `
                   -Path "OU=$OU,DC=iconic,DC=local"
    }
}
```

---

## 🔰 Step 3: Add Security Groups (Optional but Recommended)

Create groups to test permissions.

```powershell
# Create a security group in each OU
foreach ($OU in $OUs) {
    New-ADGroup -Name "$OU-Group" `
                -GroupScope Global `
                -GroupCategory Security `
                -Path "OU=$OU,DC=iconic,DC=local"
}
```

---

## 🔰 Step 4: Assign Users to Groups (Optional but Recommended)

```powershell
foreach ($OU in $UserList.Keys) {
    $GroupName = "$OU-Group"
    foreach ($User in $UserList[$OU]) {
        Add-ADGroupMember -Identity $GroupName -Members $User
    }
}
```

---

## 🔰 Step 5: Create Shared Folders (Resources) and Assign Permissions

This step tests file-share resources and their permissions.

```powershell
# Create test shared folders
$SharedRoot = "C:\Shared"
New-Item -Path $SharedRoot -ItemType Directory

foreach ($OU in $OUs) {
    $Path = "$SharedRoot\$OU"
    New-Item -Path $Path -ItemType Directory
    # Set NTFS Permissions for each group
    $ACL = Get-Acl $Path
    $Permission = "$OU-Group","Modify","ContainerInherit,ObjectInherit","None","Allow"
    $AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $Permission
    $ACL.AddAccessRule($AccessRule)
    Set-Acl -Path $Path -AclObject $ACL
}
```

---

## 🔰 Step 6: Verifying Before & After Migration

Run these commands **before and after migration** to verify that everything migrated correctly:

### OU Verification:

```powershell
Get-ADOrganizationalUnit -Filter * | Select Name, DistinguishedName
```

### User Verification:

```powershell
Get-ADUser -Filter * | Select Name, SamAccountName, DistinguishedName
```

### Group Membership Verification:

```powershell
Get-ADGroup -Filter * | Select Name, Members
```

### Folder Permissions Verification:

```powershell
Get-ChildItem -Path "C:\Shared" | ForEach-Object {
    $_.FullName
    Get-Acl $_.FullName | Select -ExpandProperty Access | Select FileSystemRights, IdentityReference
}
```

---

## ✅ **Final Tips for Migration Verification:**

* Export these results to CSV before migrating and after migrating.

  ```powershell
  Get-ADUser -Filter * | Select Name, SamAccountName, DistinguishedName | Export-Csv "C:\AD_UserList_Before.csv"
  ```
* Compare CSV files using Excel or PowerShell after migration.

  ```powershell
  # Example of comparison using PowerShell
  $before = Import-Csv "C:\AD_UserList_Before.csv"
  $after = Import-Csv "C:\AD_UserList_After.csv"
  Compare-Object $before $after -Property Name,SamAccountName,DistinguishedName
  ```

---

By following these steps, you'll clearly understand what exists in your environment pre-migration, easily detect any missing data post-migration, and have concrete evidence of migration success or issues.
