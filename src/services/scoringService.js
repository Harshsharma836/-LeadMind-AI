export const calculateRuleScore = (lead, offer) => {
  let score = 0;

  const role = lead.role?.toLowerCase();
  if (role?.includes("head") || role?.includes("founder") || role?.includes("ceo")) score += 20;
  else if (role?.includes("manager") || role?.includes("lead")) score += 10;

  const match = offer.ideal_use_cases?.some(
    (useCase) => lead.industry?.toLowerCase().includes(useCase.toLowerCase())
  );
  if (match) score += 20;

  if (lead.name && lead.role && lead.company && lead.industry && lead.location) score += 10;

  return score;
};
