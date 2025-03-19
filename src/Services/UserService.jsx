import {
  getAllAccounts,
  updateAccountById,
} from "../APIHandler/UserManagerAPIHandler";

class UserService {
  constructor(
    setAccounts,
    setTotalPages,
    setLoading,
    setError,
    setActionLoading
  ) {
    this.setAccounts = setAccounts;
    this.setTotalPages = setTotalPages;
    this.setLoading = setLoading;
    this.setError = setError;
    this.setActionLoading = setActionLoading;
  }

  fetchAccounts = async (currentPage, itemsPerPage) => {
    try {
      this.setLoading(true);
      this.setError(null);
      const response = await getAllAccounts(currentPage, itemsPerPage);
      const sortedItems = Array.isArray(response.items)
        ? response.items.sort(
            (a, b) => new Date(b.createAt) - new Date(a.createAt)
          )
        : [];
      this.setAccounts(sortedItems);
      this.setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài khoản:", error);
      if (error.response?.status === 401) {
        this.setError("Unauthorized: Please log in to access this data.");
      } else {
        this.setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
    } finally {
      this.setLoading(false);
    }
  };

  handleEditAccount = async (
    selectedAccount,
    formData,
    currentPage,
    itemsPerPage,
    setShowEditModal,
    setFormData
  ) => {
    const { isValid, errors } = this.validateForm(formData);
    if (!isValid) {
      this.setError(null);
      throw { errors };
    }
    try {
      this.setActionLoading(true);
      this.setError(null);
      await updateAccountById(selectedAccount.id, formData);
      await this.fetchAccounts(currentPage, itemsPerPage);
      setShowEditModal(false);
      setFormData({});
    } catch (error) {
      console.error("Error updating account:", error);
      this.setError(error.message || "Failed to update account.");
      throw error;
    } finally {
      this.setActionLoading(false);
    }
  };

  validateForm = (formData) => {
    const errors = {};
    if (!formData.fullName?.trim()) errors.fullName = "Full name is required";
    if (!formData.email?.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email format";
    if (!formData.phoneNumber?.trim())
      errors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.address?.trim()) errors.address = "Address is required";
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  filterAccounts = (accounts, searchTerm) => {
    return accounts.filter(
      (account) =>
        account.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  sortAccounts = (filteredAccounts, sortDirection) => {
    return [...filteredAccounts].sort((a, b) =>
      sortDirection === "descending"
        ? new Date(b.createAt) - new Date(a.createAt)
        : new Date(a.createAt) - new Date(b.createAt)
    );
  };
}

export default UserService;
