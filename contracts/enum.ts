export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  SAPERATED = "saperated",
}

export enum TransactionStatus {
  PENDING = "pending",
  FAILED = "failed",
  ABANDONED = "abandoned",
  SUCCESSFUL = "successful"
}

export enum TransactionEntity {
  WALLETFUNDING = "walletfunding",
  PAYOUTS = "payouts",
  WALLETTRANSFERS = "wallettransfers"
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum ImageType {
  SINGLE = "single",
  GROUP = "group",
}

export enum PasswordStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum UserType {
  USER = "user",
  ADMIN = "admin",
}
